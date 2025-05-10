import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient, Prisma } from '@prisma/client'

const extentions = Prisma.defineExtension({
  query: {
    // Aplica-se a todas as operações e modelos
    async $allOperations({ model, operation, args, query }) {
      return query(args) // executa a operação original
    },
  },
})
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'query', 'info', 'warn'] })

    this.$extends(extentions)
  }

  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close()
    })
  }
}
