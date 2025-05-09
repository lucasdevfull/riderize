import { GraphQLError } from 'graphql'

export class UserAlreadyExistsException extends GraphQLError {
  constructor() {
    super('User already exists', {
      extensions: {
        code: 'USER_ALREADY_EXISTS',
      },
    })
  }
}

export class UserNotFoundException extends GraphQLError {
  constructor() {
    super('User not found', {
      extensions: {
        code: 'USER_NOT_FOUND',
      },
    })
  }
}
