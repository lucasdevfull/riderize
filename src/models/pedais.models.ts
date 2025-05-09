import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Pedais' })
export class Pedais {
  @Field(type => ID, { nullable: true })
  pedalId: string
  @Field(type => String, { nullable: true })
  name: string
  @Field(type => Date, { nullable: true })
  startDateRegistration: Date
  @Field(type => Date, { nullable: true })
  endDateRegistration: Date
  @Field(type => String, { nullable: true })
  additionalInfomation?: string
  @Field(type => String, { nullable: true })
  startPlace: string
  @Field(type => Int, { nullable: true })
  participantsLimit?: number
  @Field(type => String, { nullable: true })
  userId: string
}
