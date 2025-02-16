import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { TaskService } from '../services/task.service'
import { CreateTaskDto } from '../dto/create-task.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.taskService.findAll()
  }

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
}
