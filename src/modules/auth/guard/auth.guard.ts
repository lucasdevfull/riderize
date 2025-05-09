import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { GraphQLError } from 'graphql'
import { UserRepository } from 'src/modules/users/repository/user.repository'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UserRepository
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request: Request = ctx.getContext().req
    console.log(request.headers.authorization)
    const token = request.headers.authorization?.split(' ')[1]
    if (!token)
      throw new GraphQLError('Unauthorized', {
        extensions: { code: 'UNAUTHORIZED' },
      })

    const { sub } = this.jwtService.verify<{
      sub: string
      iat: number
      exp: number
    }>(token)

    const user = await this.usersRepository.findById(sub)

    if (!user) {
      throw new GraphQLError('Unauthorized', {
        extensions: { code: 'UNAUTHORIZED' },
      })
    }

    // ctx.getContext().req.context = {
    //   ...ctx.getContext().req.context,
    //   user:user.userId
    // }

    return true
  }
}
