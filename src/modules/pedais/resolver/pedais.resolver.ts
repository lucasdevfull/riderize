import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Pedais } from 'src/models/pedais.models'
import { PedaisService } from '../service/pedais.service'
import { CreatePedalDto } from 'src/dto/pedal.dto'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/modules/auth/guard/auth.guard'
import type { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

@Resolver()
export class PedaisResolver {
  constructor(
    private pedaisService: PedaisService,
    private jwtService: JwtService
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [Pedais], { name: 'getAllPedais' })
  async getAllPedais() {
    return this.pedaisService.getAllPedais()
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Pedais, { name: 'createPedais' })
  async createPedais(
    @Context('req') req: Request,
    @Args('data') data: CreatePedalDto
  ) {
    const token = req.headers.authorization?.split(' ')[1] as string
    const { sub } = await this.jwtService.verifyAsync<{ sub: string }>(token)

    const result = await this.pedaisService.createPedal(data, sub)
    return result
  }
}
