import { GraphQLError } from 'graphql'

export class RegistrationPeriodExpiredException extends GraphQLError {
  constructor() {
    super('Registration period has expired', {
      extensions: {
        code: 'REGISTRATION_PERIOD_EXPIRED',
        http: { status: 400 },
      },
    })
  }
}

export class PedalNotFoundException extends GraphQLError {
  constructor() {
    super('Pedal not found', {
      extensions: {
        code: 'PEDAL_NOT_FOUND',
        http: { status: 404 },
      },
    })
  }
}
