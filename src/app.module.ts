import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphqlModule } from './infra/graphql/graphql.module'
import { PrismaModule } from './infra/prisma/prisma.module'
import { AuthModule } from './modules/auth/modules/auth.module'
import { PedaisModule } from './modules/pedais/pedais.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    UsersModule,
    PedaisModule,
    PrismaModule,
    AuthModule,
    GraphqlModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
