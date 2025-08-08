import { Module } from '@nestjs/common'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { PasswordService } from '@services/password/password.service'
import { UserRepository } from '@repositories/user.repository'
import { UsersResolver } from '@resolvers/users.resolver'
import { UsersService } from '@services/users.service'

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, PasswordService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
