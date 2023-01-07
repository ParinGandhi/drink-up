import { User } from './User.model';

export interface IAppState {
  user: {
    created_at: null;
    email: null;
    first_name: null;
    id: null;
    last_name: null;
  };
  isLoading: boolean;
}
