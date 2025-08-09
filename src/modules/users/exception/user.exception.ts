import { GraphQLError } from 'graphql'

export class UserAlreadyExistsException extends GraphQLError {
  constructor() {
    super('User already exists', {
      extensions: {
        code: 'USER_ALREADY_EXISTS',
        originalError: {
          message: 'User already exists',
          error: 'CONFLIT',
          statusCode: 409,
        },
      },
    })
  }
}

export class UserNotFoundException extends GraphQLError {
  constructor() {
    super('User not found', {
      extensions: {
        code: 'USER_NOT_FOUND',
        originalError: {
          message: 'User not found',
          error: 'NOT_FOUND',
          statusCode: 404,
        },
      },
    })
  }
}
