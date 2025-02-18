import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './services/app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { MongooseModule } from '@nestjs/mongoose' // Importar Mongoose
import { TaskModel } from './models/mongoose/task.model' // Importar el esquema de tareas (corrigiendo el error tipográfico)
import Redis from 'ioredis' // Importar ioredis
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Para leer las variables de entorno
    AuthModule,
    // Configuración de PostgreSQL
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        autoLoadModels: true,
        synchronize: true, // Solo en desarrollo, en producción usar migraciones
        logging: (msg: string) => console.log('PostgreSQL Log:', msg), // Esto agregará logs detallados
      }),
    }),
    // Configuración de Redis (agrega un log para confirmar la conexión)
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redis = new Redis({
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
          username: configService.get<string>('REDIS_USER'), // Usar variable de entorno REDIS_USER
        })

        redis.on('connect', () => {
          console.log('Conexión exitosa a Redis')
        })

        redis.on('error', (err) => {
          console.error('Error de conexión a Redis:', err)
        })

        return {
          store: redis, // Establecemos Redis como el store para caché
        }
      },
    }),
    // Configuración de MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para acceder a las variables de entorno
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Obtén la URI de MongoDB desde las variables de entorno
      }),
    }),
    // Registra el modelo de MongoDB
    MongooseModule.forFeature([{ name: 'Task', schema: TaskModel }]), // Corrige la importación del esquema
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
