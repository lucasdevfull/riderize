import { FastifyRequest } from 'fastify';
import { UserEntity } from 'src/domains/entities/user';

type UserPayload = Pick<
  UserEntity,
  'id' | 'fullName' | 'email' | 'roles' | 'isActive'
>;

export type Payload = UserPayload & { type: 'access' | 'refresh' };

export interface AuthenticatedFastifyRequest<
  T extends Record<string, unknown> = unknown,
> extends FastifyRequest {
  user: Payload;
  params: T;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserPayload;
  }
}
