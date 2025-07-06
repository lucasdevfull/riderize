import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID, { nullable: true })
  userId?: string
  @Field(() => String, { nullable: true })
  email?: string
  @Field(() => String)
  password: string
  @Field(() => Date, { nullable: true })
  createdAt?: Date
}
