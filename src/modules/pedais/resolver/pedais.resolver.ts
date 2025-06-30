import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Pedais } from 'src/models/pedais.models'
import { PedaisService } from '../service/pedais.service'
import { CreatePedalDto } from 'src/dto/pedal.dto'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/modules/auth/guard/auth.guard'
import type { Request } from 'express'
import { plainToInstance } from 'class-transformer'
import { CreateEnrollmentDto } from 'src/dto/enrollment.dto'
import dayjs from 'dayjs'
import { validate } from 'class-validator'
@Resolver()
export class PedaisResolver {
  constructor(private pedaisService: PedaisService) {}

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
    const result = await this.pedaisService.createPedal(data, req.user!)
    return result
  }

  @UseGuards(AuthGuard)
  @Mutation(() => 'String', { name: 'inscribePedal' })
  async enrollment(
    @Context('req') req: Request,
    @Args('pedalId') pedalId: string
  ) {
    const enrollmentDto = plainToInstance(CreateEnrollmentDto, {
      userId: req.user!,
      pedalId,
      subscriptionDate: dayjs().toDate(),
    })
    const error = await validate(enrollmentDto)
    if (error.length > 0) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return this.pedaisService.createEnrollment(enrollmentDto)
  }
}
