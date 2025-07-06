import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { LoginDto } from 'src/dto/user.dto'
import { Token } from 'src/models/auth.models'
import { AuthService } from '../service/auth/auth.service'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Token)
  async login(@Args('data') data: LoginDto) {
    const user = await this.authService.validateUser(data)
    const token = await this.authService.generateToken(user)
    return token
  }
}
