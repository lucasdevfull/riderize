import { Test, TestingModule } from '@nestjs/testing'
import { PedaisService } from './pedais.service'

describe('PedaisService', () => {
  let service: PedaisService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedaisService],
    }).compile()

    service = module.get<PedaisService>(PedaisService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
