import { CreateEnrollmentDto } from '@dtos/enrollment.dto'
import { CreatePedalDto } from '@dtos/pedal.dto'
import { AuthGuard } from '@guards/auth.guard'
import { Enrollment } from '@models/enrollment.model'
import { Pedais } from '@models/pedais.model'
import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PedaisService } from '@services/pedais.service'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import dayjs from 'dayjs'
import type { Request } from 'express'
import { ValidationException } from '@common/exception'
import { CreateEnrollment } from '@/types/enrollment.types'

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
  @Mutation(() => Enrollment, { name: 'inscribePedal' })
  async enrollment(
    @Context('req') { user }: Request,
    @Args('pedalId') pedalId: string
  ) {
    const enrollmentDto = plainToInstance<
      CreateEnrollmentDto,
      CreateEnrollment
    >(CreateEnrollmentDto, {
      userId: user,
      pedalId,
      subscriptionDate: dayjs().toDate(),
    })
    const error = await validate(enrollmentDto)
    if (error.length > 0) {
      throw new ValidationException(error)
    }
    return this.pedaisService.createEnrollment(enrollmentDto)
  }
}
