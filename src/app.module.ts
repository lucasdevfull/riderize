import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
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
})
export class AppModule {}
