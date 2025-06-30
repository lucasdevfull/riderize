import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreatePedalDto } from 'src/dto/pedal.dto'
@Injectable()
export class PedaisRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.pedal.findMany()
  }

  async findById(pedalId: string) {
    return await this.prisma.pedal.findUnique({ where: { pedalId } })
  }

  async findByUserId(userId: string) {
    return await this.prisma.pedal.findMany({
      where: { userId },
    })
  }

  async create(data: CreatePedalDto, userId: string) {
    return await this.prisma.pedal.create({
      data: {
        ...data,
        user: {
          connect: { userId },
        },
      },
    })
  }
}
