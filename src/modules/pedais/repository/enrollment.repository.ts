import { Injectable } from '@nestjs/common'
import type { Enrollment } from '@prisma/client'
import type { CreateEnrollmentDto } from '@dtos/enrollment.dto'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { EnrollmentPedal } from '@/types/enrollment.types'
import type { IEnrollmentRepository } from '@/types/interfaces/enrollment.types'

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
