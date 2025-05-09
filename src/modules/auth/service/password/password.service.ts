import { Injectable } from '@nestjs/common'
import { genSalt, hash } from '@node-rs/bcrypt'

@Injectable()
export class PasswordService {
  async passwordHash(password: string, salt: number) {
    const saltRounds = await genSalt(salt)
    const pass = await hash(password,salt, saltRounds)
    return pass
  }
}
