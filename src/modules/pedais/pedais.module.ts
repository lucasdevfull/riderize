import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { AuthModule } from '../auth/modules/auth.module'
import { UsersModule } from '../users/users.module'
import { EnrollmentRepository } from './repository/enrollment.repository'
import { PedaisRepository } from './repository/pedais.repository'
import { PedaisResolver } from './resolver/pedais.resolver'
import { PedaisService } from './service/pedais.service'

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  providers: [
    PedaisResolver,
    PedaisService,
    PedaisRepository,
    EnrollmentRepository,
  ],
})
export class PedaisModule {}
