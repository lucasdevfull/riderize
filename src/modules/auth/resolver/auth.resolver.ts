import { LoginDto } from '@dtos/user.dto'
import { Token } from '@models/auth.model'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from '@services/auth/auth.service'

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
