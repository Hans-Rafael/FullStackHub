import { CacheModule, CacheOptions } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-ioredis'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const RedisCacheModule = CacheModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<CacheOptions> => ({
    store: redisStore,
    url: configService.get<string>('REDIS_URL'), // Usamos la URL completa de Redis
    ttl: 3600, // Caché de 1 hora
  }),
})
