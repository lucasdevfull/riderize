import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
