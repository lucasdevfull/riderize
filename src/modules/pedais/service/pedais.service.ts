import { CreateEnrollmentDto } from '@dtos/enrollment.dto'
import { CreatePedalDto } from '@dtos/pedal.dto'
import {
  PedalNotFoundException,
  RegistrationPeriodExpiredException,
} from '@exception/pedais.exception'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { EnrollmentRepository } from '@repositories/enrollment.repository'
import { PedaisRepository } from '@repositories/pedais.repository'
import dayjs from 'dayjs'

@Injectable()
export class PedaisService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
    private pedaisRepository: PedaisRepository,
    private enrollmentRepository: EnrollmentRepository
  ) {}

  async getAllPedais() {
    const cached = await this.cache.get('pedais')
    if (cached) return cached

    const pedais = await this.pedaisRepository.findAll()
    await this.cache.set('pedais', pedais)
    return pedais
  }

  async getPedalByUserId(userId: string) {
    const cached = await this.cache.get(`pedais-${userId}`)
    if (cached) return cached

    const pedal = await this.pedaisRepository.findByUserId(userId)
    await this.cache.set(`pedais-${userId}`, pedal)
    return pedal
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
