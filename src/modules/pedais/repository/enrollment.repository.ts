import { Injectable } from '@nestjs/common'
import { CreateEnrollmentDto } from 'src/dto/enrollment.dto'
import { PrismaService } from 'src/infra/prisma/prisma.service'

@Injectable()
export class EnrollmentRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByUserID(userId: string) {
    return await this.prisma.inscricao.findMany({
      where: { userId },
      include: { pedal: true },
    })
  }
  async create(data: CreateEnrollmentDto) {
    return await this.prisma.inscricao.create({ data })
  }
}
