//modelo en MongoDB
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Task extends Document {
  static findByPk(id: number) {
    throw new Error('Method not implemented.')
  }
  @Prop({ required: true })
  title: string

  @Prop()
  description: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop()
  userId: string // Relación con el usuario que creó la tarea.
}

export const TaskModel = SchemaFactory.createForClass(Task)
