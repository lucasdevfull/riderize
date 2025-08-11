import { AuthGuard } from '@guards/auth.guard'
import { UsersModule } from '@modules/users/users.module'
import { Module } from '@nestjs/common'
import { AuthResolver } from '@resolvers/auth.resolver'
import { AuthService } from '@services/auth/auth.service'
import { JwtCoreModule } from '@/infra/jwt/jwt.module'

@Module({
  imports: [UsersModule, JwtCoreModule],
  providers: [AuthResolver, AuthService, AuthGuard],
  exports: [JwtCoreModule],
})
export class AuthModule {}
