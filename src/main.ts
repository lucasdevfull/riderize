import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'
import type { Env } from './types/env.types'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(Logger))
  const configService = app.get<ConfigService<Env>>(ConfigService)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  await app.listen(configService.get<number>('PORT') ?? 3000)
}
bootstrap()
