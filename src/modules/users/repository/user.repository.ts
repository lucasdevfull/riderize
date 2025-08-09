import { CreateUserDto } from '@dtos/user.dto'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { IUserRepository } from '@/types/interfaces/user.types'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { userId: id } })
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }
  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data })
  }
}
