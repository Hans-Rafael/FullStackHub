import { Injectable, Inject } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Task } from '../models/mongoose/task.model'
import { CreateTaskDto } from '../dto/create-task.dto'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = await this.taskModel.create(createTaskDto) // Usa create para crear una nueva tarea
    await this.cacheManager.del(`task-${createdTask._id}`) // Invalida la caché para la tarea específica
    return createdTask
  }

  async findOne(id: string): Promise<Task | null> {
    const cacheKey = `task-${id}`
    const cachedTask = await this.cacheManager.get<Task>(cacheKey)

    if (cachedTask) {
      return cachedTask
    }

    const task = await this.taskModel.findById(id).exec() // Utiliza findById para buscar por ID en Mongoose
    if (task) {
      await this.cacheManager.set(cacheKey, task, { ttl: 300 } as any) // Almacena en caché por 5 minutos
    }
    return task
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec() // Utiliza find para obtener todas las tareas
  }
}
