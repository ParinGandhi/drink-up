import { IAppState } from './AppState.interface';
import { User } from './User.model';

export class AppState implements IAppState {
  user = new User();
  isLoading = false;

  constructor() {}
}
