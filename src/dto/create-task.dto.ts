export class CreateTaskDto {
  readonly title: string
  readonly description: string
  readonly userId: string // Relación con el usuario que crea la tarea
}
