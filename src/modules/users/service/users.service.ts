import { randomInt } from 'node:crypto'
import { CreateUserDto } from '@dtos/user.dto'
import { UserAlreadyExistsException } from '@exception/user.exception'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserRepository } from '@repositories/user.repository'
import { PasswordService } from '@services/password/password.service'

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll()
  }
  async createUser({ email, password }: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) throw new UserAlreadyExistsException()

    password = await this.passwordService.passwordHash(
      password,
      randomInt(10, 14)
    )
    return await this.userRepository.create({ email, password })
  }
}
