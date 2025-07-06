import { Injectable } from '@nestjs/common'
import type { Enrollment } from '@prisma/client'
import type { CreateEnrollmentDto } from 'src/dto/enrollment.dto'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { EnrollmentPedal } from 'src/types/enrollment.types'
import type { IEnrollmentRepository } from 'src/types/interfaces/enrollment.types'

@Injectable()
export class EnrollmentRepository implements IEnrollmentRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByUserID(userId: string): Promise<EnrollmentPedal[]> {
    return await this.prisma.enrollment.findMany({
      where: { userId },
      include: { pedal: true },
    })
  }
  async create(data: CreateEnrollmentDto): Promise<Enrollment> {
    return await this.prisma.enrollment.create({ data })
  }
}
