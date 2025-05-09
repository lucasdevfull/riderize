import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { UsersModule } from './modules/users/users.module'
import { PrismaModule } from './infra/prisma/prisma.module'
import { AuthModule } from './modules/auth/modules/auth.module'
import { ConfigModule } from '@nestjs/config'
import { PedaisModule } from './modules/pedais/pedais.module'

@Module({
  imports: [
    UsersModule,
    PedaisModule,
    PrismaModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      formatError: ({ message, extensions }) => {
        return {
          message,
          extensions: {
            code: extensions?.code,
          },
        }
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
