import { AuthModule } from '@modules/auth/modules/auth.module'
import { UsersModule } from '@modules/users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { PedaisResolver } from '@resolvers/pedais.resolver'
import { PedaisService } from '@services/pedais.service'
import { verify } from 'crypto'
import { PrismaModule } from '@/infra/prisma/prisma.module'
import { AuthGuard } from '@/modules/auth/guard/auth.guard'
import type { Env } from '@/types/env.types'

describe('PedaisResolver', () => {
  let resolver: PedaisResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedaisResolver,
        {
          provide: PedaisService,
          useValue: {
            getAllPedais: jest.fn(),
            createPedal: jest.fn(),
            createEnrollment: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(),
          },
        },
      ],
      imports: [UsersModule, PrismaModule],
    }).compile()

    resolver = module.get<PedaisResolver>(PedaisResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
