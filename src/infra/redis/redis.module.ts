import { createKeyv } from '@keyv/redis'
import { CACHE_MANAGER, Cache, CacheModule } from '@nestjs/cache-manager'
import { Global, Inject, Module, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        //  const redis = new Redis({
        //    port: 6379,
        //    db: 0,
        //  })
        //  try {
        //   await redis.connect()
        //    await redis.ping()
        //  } catch (error) {
        //    throw new Error(`Falha ao conectar no redis: ${error.message}`)
        //  }
        return {
          isGlobal: true,
          store: createKeyv(configService.get<string>('REDIS_URL')),
          ttl: 60,
        }
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}
  async onModuleInit() {
    try {
      await this.cache.set('heath-check', 'ok', 5)
    } catch (error) {
      throw new Error(`Falha ao conectar no redis: ${error.message}`)
    }
  }
}
