import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Test, TestingModule } from '@nestjs/testing'
import { EnrollmentRepository } from '@repositories/enrollment.repository'
import { PedaisRepository } from '@repositories/pedais.repository'
import { PedaisService } from '@services/pedais.service'
import { RedisModule } from '@/infra/redis/redis.module'

describe('PedaisService', () => {
  let service: PedaisService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedaisService,
        {
          provide: PedaisRepository,
          useValue: {
            getAllPedais: jest.fn(),
            getPedalByUserId: jest.fn(),
            createPedal: jest.fn(),
            createEnrollment: jest.fn(),
          },
        },
        {
          provide: EnrollmentRepository,
          useValue: {
            findAllByUserID: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: Cache,
        },
      ],
    }).compile()

    service = module.get<PedaisService>(PedaisService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
