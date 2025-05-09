import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreatePedalDto {
  @Field(type => String)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsDate()
  @IsNotEmpty()
  @Field(type => Date)
  startDateRegistration: Date

  @IsDate()
  @IsNotEmpty()
  @Field(type => Date)
  endDateRegistration: Date

  @IsString()
  @IsOptional()
  @Field(type => String, { nullable: true })
  additionalInfomation?: string

  @IsString()
  @IsNotEmpty()
  @Field(type => String)
  startPlace: string

  @IsOptional()
  @Field(type => Int, { nullable: true })
  participantsLimit?: number
}
