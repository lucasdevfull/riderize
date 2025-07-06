import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from '@node-rs/bcrypt'
import { User } from '@prisma/client'
import { GraphQLError } from 'graphql'
import { LoginDto } from 'src/dto/user.dto'
import { UserNotFoundException } from 'src/modules/users/exception/user.exception'
import { UserRepository } from 'src/modules/users/repository/user.repository'

@Injectable()
export class AuthService {
  constructor(
    private jswtService: JwtService,
    private usersRepository: UserRepository
  ) {}

  async generateToken({ userId }: User): Promise<{ accessToken: string }> {
    return {
      accessToken: await this.jswtService.signAsync({ sub: userId }),
    }
  }

  async validateUser({ email, password }: LoginDto): Promise<User> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundException()
    }

    if (!compareSync(password, user.password)) {
      throw new GraphQLError('Invalid password', {
        extensions: {
          code: 'INVALID_PASSWORD',
        },
      })
    }

    return user
  }
}
