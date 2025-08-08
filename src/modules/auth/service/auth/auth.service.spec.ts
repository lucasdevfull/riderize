import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { UserRepository } from '@repositories/user.repository'
import { UsersModule } from '@modules/users/users.module'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: UserRepository,
        useValue: {
          findByEmail: jest.fn(),
        }
      }],
      imports: [JwtModule, UsersModule],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
