import { Injectable } from '@nestjs/common'
import type { Pedal } from '@prisma/client'
import { CreatePedalDto } from '@dtos/pedal.dto'
import { PrismaService } from '@/infra/prisma/prisma.service'
import type { IPedalRepository } from '@/types/interfaces/pedal.types'

@Injectable()
export class PedaisRepository implements IPedalRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Pedal[]> {
    return await this.prisma.pedal.findMany()
  }

  async findById(id: string): Promise<Pedal | null> {
    return await this.prisma.pedal.findUnique({ where: { pedalId: id } })
  }

  async findByUserId(userId: string): Promise<Pedal[]> {
    return await this.prisma.pedal.findMany({
      where: { userId },
    })
  }

  async create(data: CreatePedalDto, userId: string): Promise<Pedal> {
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
