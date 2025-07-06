import type { Pedal } from '@prisma/client'
import type { CreatePedalDto } from 'src/dto/pedal.dto'
import type { Repository } from './base.types'

export interface IPedalRepository
  extends Omit<Repository<Pedal, CreatePedalDto>, 'create'> {
  create(data: CreatePedalDto, userId: string): Promise<Pedal>
  findByUserId(userId: string): Promise<Pedal[]>
}
