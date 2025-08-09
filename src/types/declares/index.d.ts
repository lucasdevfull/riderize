declare namespace Express {
  interface Request {
    user: string
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    SECRET_KEY: string
    JWT: string
    ALGORITHM: string
    PORT: string | number
  }
}
