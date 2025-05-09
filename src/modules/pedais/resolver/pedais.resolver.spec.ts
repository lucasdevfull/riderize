import { Test, TestingModule } from '@nestjs/testing'
import { PedaisResolver } from './pedais.resolver'

describe('PedaisResolver', () => {
  let resolver: PedaisResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedaisResolver],
    }).compile()

    resolver = module.get<PedaisResolver>(PedaisResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
