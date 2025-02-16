import { Column, Model, Table, HasMany } from 'sequelize-typescript'
import { Task } from './task.model' // Importa el modelo de tarea

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
  })
  username: string

  @Column({
    allowNull: false,
  })
  email: string

  @Column({
    allowNull: false,
  })
  password: string

  @HasMany(() => Task)
  tasks: Task[]
}
