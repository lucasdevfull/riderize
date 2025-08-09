import { Module } from '@nestjs/common'
import { UserRepository } from '@repositories/user.repository'
import { UsersResolver } from '@resolvers/users.resolver'
import { PasswordService } from '@services/password/password.service'
import { UsersService } from '@services/users.service'
import { PrismaModule } from '@/infra/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, PasswordService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
