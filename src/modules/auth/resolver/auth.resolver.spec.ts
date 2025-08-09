import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '@services/auth/auth.service'
import { AuthResolver } from './auth.resolver'

describe('AuthResolver', () => {
  let resolver: AuthResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            generateToken: jest.fn(),
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile()

    resolver = module.get<AuthResolver>(AuthResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
