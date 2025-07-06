import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import dayjs from 'dayjs'
import type { Request } from 'express'
import { CreateEnrollmentDto } from 'src/dto/enrollment.dto'
import { CreatePedalDto } from 'src/dto/pedal.dto'
import { Pedais } from 'src/models/pedais.models'
import { AuthGuard } from 'src/modules/auth/guard/auth.guard'
import { PedaisService } from '../service/pedais.service'
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
    @Context('req') { user }: Request,
    @Args('data') data: CreatePedalDto
  ) {
    const result = await this.pedaisService.createPedal(data, user)
    return result
  }

  @UseGuards(AuthGuard)
  @Mutation(() => null, { name: 'inscribePedal' })
  async enrollment(
    @Context('req') { user }: Request,
    @Args('pedalId') pedalId: string
  ) {
    const enrollmentDto = plainToInstance(CreateEnrollmentDto, {
      userId: user,
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
