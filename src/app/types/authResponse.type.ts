import { User } from './user.type';

export type AuthResponse = {
    token: string,
    userDetails: User
}