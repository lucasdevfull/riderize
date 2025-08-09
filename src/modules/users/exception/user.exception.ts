import { GraphQLError } from 'graphql'

export class UserAlreadyExistsException extends GraphQLError {
  constructor() {
    super('User already exists', {
      extensions: {
        code: 'USER_ALREADY_EXISTS',
        http: { status: 409 },
      },
    })
  }
}

export class UserNotFoundException extends GraphQLError {
  constructor() {
    super('User not found', {
      extensions: {
        code: 'USER_NOT_FOUND',
        http: { status: 404 },
      },
    })
  }
}
