import { Injectable } from '@nestjs/common'
import { PedaisRepository } from '../repository/pedais.repository'
import { CreatePedalDto } from 'src/dto/pedal.dto'

@Injectable()
export class PedaisService {
  constructor(private pedaisRepository: PedaisRepository) {}

  async getAllPedais() {
    return await this.pedaisRepository.findAll()
  }

  async createPedal(data: CreatePedalDto, userId: string) {
    return await this.pedaisRepository.create(data, userId)
  }
}
