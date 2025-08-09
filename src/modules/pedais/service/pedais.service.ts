import { CreateEnrollmentDto } from '@dtos/enrollment.dto'
import { CreatePedalDto } from '@dtos/pedal.dto'
import {
  PedalNotFoundException,
  RegistrationPeriodExpiredException,
} from '@exception/pedais.exception'
import { Injectable } from '@nestjs/common'
import { EnrollmentRepository } from '@repositories/enrollment.repository'
import { PedaisRepository } from '@repositories/pedais.repository'
import dayjs from 'dayjs'

@Injectable()
export class PedaisService {
  constructor(
    private pedaisRepository: PedaisRepository,
    private enrollmentRepository: EnrollmentRepository
  ) {}

  async getAllPedais() {
    return await this.pedaisRepository.findAll()
  }

  async getPedalByUserId(userId: string) {
    return await this.pedaisRepository.findByUserId(userId)
  }

  async createPedal(data: CreatePedalDto, userId: string) {
    return await this.pedaisRepository.create(data, userId)
  }

  async createEnrollment(data: CreateEnrollmentDto) {
    const pedalExists = await this.pedaisRepository.findById(data.pedalId)
    if (!pedalExists) {
      throw new PedalNotFoundException()
    }
    if (
      dayjs(data.subscriptionDate).isAfter(
        dayjs(pedalExists.endDateRegistration)
      )
    ) {
      throw new RegistrationPeriodExpiredException()
    }
    return await this.enrollmentRepository.create(data)
  }
}
