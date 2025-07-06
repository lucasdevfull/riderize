import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'Enrollment' })
export class Enrollment {
  @Field(() => ID, { nullable: true })
  rideId: string
  @Field(() => String, { nullable: true })
  pedalId: string
  @Field(() => String, { nullable: true })
  userId: string
  @Field(() => Date, { nullable: true })
  subscriptionDate: Date
}
