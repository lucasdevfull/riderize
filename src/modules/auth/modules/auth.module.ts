import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Env } from 'src/types/interfaces/env.types'
import { UsersModule } from '../../users/users.module'
import { AuthGuard } from '../guard/auth.guard'
import { AuthResolver } from '../resolver/auth.resolver'
import { AuthService } from '../service/auth/auth.service'

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
