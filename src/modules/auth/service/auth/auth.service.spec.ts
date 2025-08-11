import { UsersModule } from '@modules/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '@repositories/user.repository'
import { AuthService } from './auth.service'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { PrismaModule } from '@/infra/prisma/prisma.module'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
      imports: [JwtModule, UsersModule, PrismaModule],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
