import { instanceToPlain, plainToInstance, Type } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'
import { nodeEnv } from './constants'

type NODE_ENV = keyof typeof nodeEnv

export class EnvDto {
  @IsEnum(nodeEnv)
  NODE_ENV: NODE_ENV

  @IsString()
  DATABASE_URL: string

  @IsString()
  REDIS_URL: string
  @IsString()
  SECRET_KEY: string

  @IsString()
  JWT: string

  @IsString()
  ALGORITHM: string

  @IsNumber()
  @Type(() => Number)
  PORT: number

  static validate(config: Record<string, any>): Record<string, any> {
    const envInstance = plainToInstance<EnvDto, Record<string, any>>(
      EnvDto,
      config,
      {
        enableImplicitConversion: false,
      }
    )

    const errors = validateSync(envInstance, {
      skipMissingProperties: false,
    })

    if (errors.length > 0) {
      throw new Error(errors.toString())
    }

    return instanceToPlain(envInstance) satisfies Record<string, any>
  }
}
