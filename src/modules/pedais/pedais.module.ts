import { Module } from '@nestjs/common'
import { PedaisResolver } from './resolver/pedais.resolver'
import { PedaisService } from './service/pedais.service'
import { PedaisRepository } from './repository/pedais.repository'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { AuthModule } from '../auth/modules/auth.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  providers: [PedaisResolver, PedaisService, PedaisRepository],
})
export class PedaisModule {}
