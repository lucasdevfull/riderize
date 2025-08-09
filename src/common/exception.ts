import { GraphQLError } from 'graphql'

export class ValidationException extends GraphQLError {
  constructor(error: any) {
    super('Validation failed', {
      extensions: {
        code: 'BAD_REQUEST',
        http: { status: 400 },
        validation: error,
      },
    })
  }
}

export class UnauthorizedException extends GraphQLError {
  constructor() {
    super('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
        http: { status: 401 },
      },
    })
  }
}
