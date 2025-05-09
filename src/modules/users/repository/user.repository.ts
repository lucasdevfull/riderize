import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto } from 'src/dto/user.dto'
import { PrismaService } from 'src/infra/prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async findById(userId: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { userId } })
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }
  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data })
  }
}
