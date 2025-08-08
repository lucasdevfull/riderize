import { Test, TestingModule } from '@nestjs/testing'
import { PedaisResolver } from '@resolvers/pedais.resolver'
import { PedaisService } from '@services/pedais.service'
import { AuthModule } from '@modules/auth/modules/auth.module'
import { UsersModule } from '@modules/users/users.module'

describe('PedaisResolver', () => {
  let resolver: PedaisResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedaisResolver, {
        provide: PedaisService,
        useValue: {
          getAllPedais: jest.fn(),
          createPedal: jest.fn(),
          createEnrollment: jest.fn(),
        }
      }],
      imports: [AuthModule, UsersModule],
    }).compile()

    resolver = module.get<PedaisResolver>(PedaisResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
