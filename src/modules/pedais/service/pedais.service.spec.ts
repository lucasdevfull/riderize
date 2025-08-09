import { Test, TestingModule } from '@nestjs/testing'
import { EnrollmentRepository } from '@repositories/enrollment.repository'
import { PedaisRepository } from '@repositories/pedais.repository'
import { PedaisService } from '@services/pedais.service'

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
      ],
    }).compile()

    service = module.get<PedaisService>(PedaisService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
