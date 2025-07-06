import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { CreateEnrollmentDto } from 'src/dto/enrollment.dto'
import { CreatePedalDto } from 'src/dto/pedal.dto'
import { EnrollmentRepository } from '../repository/enrollment.repository'
import { PedaisRepository } from '../repository/pedais.repository'

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
      throw new Error('Pedal not found')
    }
    if (
      dayjs(data.subscriptionDate).isAfter(
        dayjs(pedalExists.endDateRegistration)
      )
    ) {
      throw new Error('Registration period has expired')
    }
    return await this.enrollmentRepository.create(data)
  }
}
