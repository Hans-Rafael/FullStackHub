import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { User } from '../models/sequelize/user.model'
import { Task } from '../models/sequelize/task.model'

export const sequelizeConfig = SequelizeModule.forRootAsync({
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
    models: [User, Task],
    logging: (msg: string) => console.log('PostgreSQL Log:', msg), // Esto agregará logs detallados
  }),
})
