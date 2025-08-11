import { GraphqlModule } from '@infra/graphql/graphql.module'
import { PrismaModule } from '@infra/prisma/prisma.module'
import { RedisModule } from '@infra/redis/redis.module'
import { AuthModule } from '@modules/auth/modules/auth.module'
import { PedaisModule } from '@modules/pedais/pedais.module'
import { UsersModule } from '@modules/users/users.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { nodeEnv } from './constants'
import { EnvDto } from './env'

@Module({
  imports: [
    UsersModule,
    PedaisModule,
    PrismaModule,
    AuthModule,
    GraphqlModule,
    RedisModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        transport:
          process.env.NODE_ENV === nodeEnv.PRODUCTION
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
  ],
  controllers: [AppController],
})
export class AppModule {}
