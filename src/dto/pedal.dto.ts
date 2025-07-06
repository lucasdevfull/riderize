import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreatePedalDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsDate()
  @IsNotEmpty()
  @Field(() => Date)
  startDateRegistration: Date

  @IsDate()
  @IsNotEmpty()
  @Field(() => Date)
  endDateRegistration: Date

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  additionalInfomation?: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  startPlace: string

  @IsOptional()
  @Field(() => Int, { nullable: true })
  participantsLimit?: number
}
