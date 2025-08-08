import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '@services/users.service'
import { PasswordModule } from '@modules/auth/modules/password.module'
import { UserRepository } from '@repositories/user.repository'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: UserRepository, 
        useValue: {
          findAll: jest.fn(),
          findByEmail: jest.fn(),
          create: jest.fn(),
        }
      }],
      imports: [PasswordModule],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
