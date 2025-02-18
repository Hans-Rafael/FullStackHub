export class CreateUserDto {
  readonly username: string
  readonly email: string
  readonly password: string // Puedo agregar validaciones adicionales aquí o usar class-validator
}
