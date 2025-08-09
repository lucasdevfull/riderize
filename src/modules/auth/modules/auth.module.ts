import { AuthGuard } from '@guards/auth.guard'
import { UsersModule } from '@modules/users/users.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthResolver } from '@resolvers/auth.resolver'
import { AuthService } from '@services/auth/auth.service'
import { Env } from '@/types/interfaces/env.types'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<Env>) => ({
        secret: config.get<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: config.get<string>('JWT'),
          algorithm: config.get('ALGORITHM'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, AuthGuard],
  exports: [JwtModule],
})
export class AuthModule {}
