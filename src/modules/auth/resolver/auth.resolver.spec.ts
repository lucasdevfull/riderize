import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@orm/client'
import { AuthService } from '@services/auth/auth.service'
import { AuthResolver } from './auth.resolver'

describe('AuthResolver', () => {
  let resolver: AuthResolver
  beforeAll(async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    const user = await prisma.user.findUnique({
      where: {
        email: 'email@gmail.com',
      },
    })
    if (user) return
    await prisma.user.create({
      data: {
        email: 'email@gmail.com',
        password: 'hyu55678@#password',
      },
    })
  })
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

  it('Retornando um token', async () => {
    const token = await resolver.login({
      email: 'email@gmail.com',
      password: 'hyu55678@#password',
    })
    expect(token).toBe({
      accessToken: expect.any(String),
    })
  })
})
