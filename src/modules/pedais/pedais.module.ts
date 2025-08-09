import { AuthModule } from '@modules/auth/modules/auth.module'
import { UsersModule } from '@modules/users/users.module'
import { Module } from '@nestjs/common'
import { EnrollmentRepository } from '@repositories/enrollment.repository'
import { PedaisRepository } from '@repositories/pedais.repository'
import { PedaisService } from '@services/pedais.service'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { PedaisResolver } from './resolver/pedais.resolver'

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
