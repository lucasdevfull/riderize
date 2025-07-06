import type { User } from '@prisma/client'
import type { CreateUserDto } from 'src/dto/user.dto'
import type { Repository } from './base.types'

export interface IUserRepository extends Repository<User, CreateUserDto> {
  findByEmail(email: string): Promise<User | null>
}
