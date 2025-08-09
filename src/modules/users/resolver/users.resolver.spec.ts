import { Test, TestingModule } from '@nestjs/testing'
import { UsersResolver } from '@resolvers/users.resolver'
import { UsersService } from '@services/users.service'

describe('UsersResolver', () => {
  let resolver: UsersResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
