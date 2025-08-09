import { GraphQLError } from 'graphql'

export class InvalidPasswordException extends GraphQLError {
  constructor() {
    super('Invalid password', {
      extensions: {
        code: 'INVALID_PASSWORD',
        http: { status: 409 },
      },
    })
  }
}
