import { Module } from '@nestjs/common'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { AuthModule } from '@modules/auth/modules/auth.module'
import { UsersModule } from '@modules/users/users.module'
import { EnrollmentRepository } from '@repositories/enrollment.repository'
import { PedaisRepository } from '@repositories/pedais.repository'
import { PedaisResolver } from './resolver/pedais.resolver'
import { PedaisService } from '@services/pedais.service'

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
