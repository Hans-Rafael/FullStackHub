import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../models/mongoose/user.model'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save()
  }

  async findOne(id: string): Promise<User | null> {
    // Manejo de null
    return this.userModel.findById(id).exec()
  }
}
