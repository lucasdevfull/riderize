import type { Enrollment } from '@prisma/client'
import type { CreateEnrollmentDto } from 'src/dto/enrollment.dto'
import { EnrollmentPedal } from '../enrollment.types'
import type { Repository } from './base.types'

export interface IEnrollmentRepository
  extends Omit<
    Repository<Enrollment, CreateEnrollmentDto>,
    'findAll' | 'findById'
  > {
  findAllByUserID(userId: string): Promise<EnrollmentPedal[]>
}
