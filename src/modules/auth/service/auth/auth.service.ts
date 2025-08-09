import { LoginDto } from '@dtos/user.dto'
import { InvalidPasswordException } from '@exception/auth.exception'
import { UserNotFoundException } from '@exception/user.exception'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from '@node-rs/bcrypt'
import { User } from '@prisma/client'
import { UserRepository } from '@repositories/user.repository'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UserRepository
  ) {}

  async generateToken({ userId }: User): Promise<{ accessToken: string }> {
    return {
      accessToken: await this.jwtService.signAsync({ sub: userId }),
    }
  }

  async validateUser({ email, password }: LoginDto): Promise<User> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundException()
    }

    if (!compareSync(password, user.password)) {
      throw new InvalidPasswordException()
    }

    return user
  }
}
