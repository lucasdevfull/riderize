import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(type => ID, { nullable: true })
  userId?: string
  @Field(type => String, { nullable: true })
  email?: string
  @Field(type => String)
  password: string
  @Field(type => Date, { nullable: true })
  createdAt?: Date
}
