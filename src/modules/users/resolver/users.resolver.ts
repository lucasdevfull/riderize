import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUserDto } from 'src/dto/user.dto'
import { User } from 'src/models/users.model'
import { UsersService } from '../service/users.service'

@Resolver('')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserDto) {
    return this.usersService.createUser(data)
  }
}
