import { CreateEnrollmentDto } from '@dtos/enrollment.dto'
import { CreatePedalDto } from '@dtos/pedal.dto'
import { AuthGuard } from '@guards/auth.guard'
import { Enrollment } from '@models/enrollment.model'
import { Pedais } from '@models/pedais.model'
import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PedaisService } from '@services/pedais.service'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import dayjs from 'dayjs'
import type { Request } from 'express'
import { CreateEnrollment } from '@/types/enrollment.types'

@Resolver()
@UseGuards(AuthGuard)
export class PedaisResolver {
  constructor(private pedaisService: PedaisService) {}

  @Query(() => [Pedais], { name: 'getAllPedais' })
  async getAllPedais() {
    return this.pedaisService.getAllPedais()
  }

  @Mutation(() => Pedais, { name: 'createPedais' })
  async createPedais(
    @Context('req') { user }: Request,
    @Args('data') data: CreatePedalDto
  ) {
    const result = await this.pedaisService.createPedal(data, user)
    return result
  }

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
      throw new BadRequestException({
        statusCode: 400,
        message: error,
        error: 'Bad Request',
      })
      //throw new ValidationException(error)
    }
    return this.pedaisService.createEnrollment(enrollmentDto)
  }
}
