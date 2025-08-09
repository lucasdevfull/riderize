import { UnauthorizedException } from '@common/exception'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@repositories/user.repository'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UserRepository
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext<{ req: Request }>()
    const token = this.getToken(req)
    if (!token) throw new UnauthorizedException()

    const { sub } = this.jwtService.verify<{
      sub: string
      iat: number
      exp: number
    }>(token)

    const user = await this.usersRepository.findById(sub)

    if (!user) {
      throw new UnauthorizedException()
    }

    req.user = user.userId
    return true
  }

  getToken({ headers: { authorization } }: Request): string | undefined {
    return authorization?.split(' ')[1]
  }
}
