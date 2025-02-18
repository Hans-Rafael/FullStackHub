import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common'
import { TaskService } from '../services/task.service'
import { CreateTaskDto } from '../dto/create-task.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UpdateTaskDto } from 'src/dto/update-task.dto'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.taskService.findAll()
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(id)
    if (!task) {
      throw new NotFoundException('Task not found')
    }
    return task
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
