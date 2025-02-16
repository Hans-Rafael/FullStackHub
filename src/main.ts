import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'

async function bootstrap() {
  try {
    config() // Carga las variables de entorno desde el archivo .env
    // Conectar a MongoDB
    const app = await NestFactory.create(AppModule)
    await app.listen(process.env.PORT ?? 3000)
    console.log(`Application mongodb is running on: ${await app.getUrl()}`)
  } catch (error) {
    console.error('Error starting server:', error)
  }
}
bootstrap()
