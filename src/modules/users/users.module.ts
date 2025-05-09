import { Module } from '@nestjs/common'
import { UsersResolver } from './resolver/users.resolver'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { PasswordService } from '../auth/service/password/password.service'
import { UserRepository } from './repository/user.repository'
import { UsersService } from './service/users.service'

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService, PasswordService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
