import { IUser } from './User.interface';

export class User implements IUser {
  created_at = null;
  email = null;
  first_name = null;
  id = null;
  last_name = null;

  constructor() {}
}
