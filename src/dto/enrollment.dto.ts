import { IsDate, IsNotEmpty, IsUUID } from 'class-validator'

export class CreateEnrollmentDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsUUID()
  @IsNotEmpty()
  pedalId: string

  @IsDate()
  @IsNotEmpty()
  subscriptionDate: Date
}
