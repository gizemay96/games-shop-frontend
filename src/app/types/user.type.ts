import { Cart } from './cart.type';
import { Address } from './address.type';

export type User = {
  blocked: Boolean | null;
  confirmed: Boolean;
  created_at: string;
  email: string;
  id: number;
  provide: string;
  role: object;
  updated_at?: string;
  username: string;
  name: string;
  avatar: any;
  avatarUrl: string;
  cart: Cart | number;
  address: Address;
  fullname:string;
  lastName:string;
  phone:string;


};
  