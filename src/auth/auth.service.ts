import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload)
  }

  async validateUser(payload: any): Promise<any> {
    // Aquí puedes agregar lógica para validar al usuario basado en el payload
    return payload
  }
}
