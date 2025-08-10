import { AuthModule } from '@modules/auth/modules/auth.module'
import { PedaisModule } from '@modules/pedais/pedais.module'
import { UsersModule } from '@modules/users/users.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphqlModule } from '@/infra/graphql/graphql.module'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { EnvDto } from './env'
import { LoggerModule } from 'nestjs-pino'
import { CacheModule } from '@nestjs/cache-manager'
import { createKeyv } from '@keyv/redis'

@Module({
  imports: [
    UsersModule,
    PedaisModule,
    PrismaModule,
    AuthModule,
    GraphqlModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                },
              },
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: EnvDto.validate,
    }),
    // CacheModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     isGlobal: true,
    //     store: createKeyv(configService.get<string>('REDIS_URL')),
    //     ttl: 60,
    //   }),
    // }),
  ],
})
export class AppModule {}
