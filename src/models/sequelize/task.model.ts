import { Column, Model, Table, ForeignKey } from 'sequelize-typescript'
import { User } from './user.model' // Importa el modelo de usuario

@Table
export class Task extends Model<Task> {
  @Column({
    allowNull: false,
  })
  title: string

  @Column
  description: string

  @ForeignKey(() => User)
  @Column
  userId: number // Relación con el usuario que crea la tarea
}
