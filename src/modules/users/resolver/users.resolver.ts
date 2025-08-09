import { CreateUserDto } from '@dtos/user.dto'
import { User } from '@models/users.model'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersService } from '@services/users.service'

@Resolver('')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserDto) {
    return this.usersService.createUser(data)
  }
}
