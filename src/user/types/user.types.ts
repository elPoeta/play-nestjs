import { UserEntity } from '../user.entity';

export type UserType = Omit<UserEntity, 'hashPassword' | 'comparePassword' | 'hasId' | 'save' | 'remove' | 'softRemove' |'recover' | 'reload'>;