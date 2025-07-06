import type { Enrollment, Pedal } from '@prisma/client'

export type EnrollmentPedal = { pedal: Pedal } & Enrollment
