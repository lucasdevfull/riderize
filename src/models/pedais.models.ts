import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Pedais' })
export class Pedais {
  @Field(() => ID, { nullable: true })
  pedalId: string
  @Field(() => String, { nullable: true })
  name: string
  @Field(() => Date, { nullable: true })
  startDateRegistration: Date
  @Field(() => Date, { nullable: true })
  endDateRegistration: Date
  @Field(() => String, { nullable: true })
  additionalInfomation?: string
  @Field(() => String, { nullable: true })
  startPlace: string
  @Field(() => Int, { nullable: true })
  participantsLimit?: number
  @Field(() => String, { nullable: true })
  userId: string
}
