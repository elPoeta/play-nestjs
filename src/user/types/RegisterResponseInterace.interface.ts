import { UserType } from './user.types';

export interface RegisterResponseInterface {
  user: UserType & { token: string };
}