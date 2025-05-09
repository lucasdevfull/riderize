import { Module } from '@nestjs/common'
import { UsersModule } from '../../users/users.module'
import { AuthResolver } from '../resolver/auth.resolver'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from '../service/auth/auth.service'
import { AuthGuard } from '../guard/auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
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
