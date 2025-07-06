import type { Enrollment, Pedal } from '@prisma/client'
import { CreateEnrollmentDto } from 'src/dto/enrollment.dto'

export type EnrollmentPedal = { pedal: Pedal } & Enrollment

export type CreateEnrollment = CreateEnrollmentDto
