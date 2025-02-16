import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        url: configService.get<string>('POSTGRES_URL'),
        autoLoadModels: true,
        synchronize: true, // Solo para desarrollo
      }),
    }),
  ],
})
export class DatabaseModule {}
