import { GraphQLError } from 'graphql'

export class InvalidPasswordException extends GraphQLError {
  constructor() {
    super('Invalid password Exception', {
      extensions: {
        code: 'INVALID_PASSWORD',
        originalError: {
          message: 'Invalid password',
          error: 'CONFLIT',
          statusCode: 409,
        },
      },
    })
  }
}
