import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setUserSession(userId: string, sessionData: any): Promise<void> {
    await this.cacheManager.set(`session-${userId}`, sessionData, {
      ttl: 3600,
    } as any) // 1 hora de TTL
  }

  async getUserSession(userId: string): Promise<any> {
    return this.cacheManager.get(`session-${userId}`)
  }

  async invalidateUserSession(userId: string): Promise<void> {
    await this.cacheManager.del(`session-${userId}`) // Elimina la caché de la sesión específica
  }
}
