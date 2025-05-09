import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator'

@InputType()
export class CreateUserDto {
  @Field()
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty()
  email: string

  @Field()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
  })
  password: string
}

@InputType()
export class LoginDto {
  @Field()
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty()
  email: string

  @Field()
  @IsNotEmpty()
  password: string
}
