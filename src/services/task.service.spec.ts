import { Test, TestingModule } from '@nestjs/testing'
import { TaskService } from './task.service'
import { getModelToken } from '@nestjs/mongoose'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Task } from '../models/mongoose/task.model'
import { CreateTaskDto } from '../dto/create-task.dto'

const mockTaskModel = {
  create: jest.fn().mockResolvedValue({
    _id: 'someId',
    title: 'New Task',
    description: 'New Task Description',
    userId: 'testUserId',
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({
      _id: 'someId',
      title: 'Test Task',
      description: 'Test Description',
      userId: 'testUserId',
    }),
  }),
  find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }),
}

const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
}

describe('TaskService', () => {
  let service: TaskService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getModelToken(Task.name), useValue: mockTaskModel },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile()

    service = module.get<TaskService>(TaskService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a task', async () => {
    const taskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'New Task Description',
      userId: 'testUserId',
    }
    const result = await service.create(taskDto)

    expect(mockTaskModel.create).toHaveBeenCalledWith(taskDto)
    expect(mockCacheManager.del).toHaveBeenCalledWith(`task-${result._id}`)
    expect(result).toEqual({
      _id: 'someId',
      title: 'New Task',
      description: 'New Task Description',
      userId: 'testUserId',
    })
  })

  it('should find a task by ID', async () => {
    const taskId = 'someId'
    const cachedTask = {
      _id: taskId,
      title: 'Cached Task',
      description: 'Cached Task Description',
      userId: 'testUserId',
    }

    mockCacheManager.get.mockResolvedValueOnce(cachedTask)

    const result = await service.findOne(taskId)

    expect(mockCacheManager.get).toHaveBeenCalledWith(`task-${taskId}`)
    expect(mockTaskModel.findById).not.toHaveBeenCalled() // No debe llamar a la base de datos si está en caché
    expect(result).toEqual(cachedTask)
  })

  it('should find a task by ID from the database if not in cache', async () => {
    const taskId = 'someId'
    const dbTask = {
      _id: taskId,
      title: 'DB Task',
      description: 'DB Task Description',
      userId: 'testUserId',
    }

    mockCacheManager.get.mockResolvedValueOnce(null)
    mockTaskModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(dbTask),
    })

    const result = await service.findOne(taskId)

    expect(mockCacheManager.get).toHaveBeenCalledWith(`task-${taskId}`)
    expect(mockTaskModel.findById).toHaveBeenCalledWith(taskId)
    expect(mockCacheManager.set).toHaveBeenCalledWith(
      `task-${taskId}`,
      dbTask,
      { ttl: 300 } as any,
    )
    expect(result).toEqual(dbTask)
  })
})
