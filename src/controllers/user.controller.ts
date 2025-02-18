import { Controller, Get, Post, Body,Param, UseGuards,Put, Delete } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }
}
