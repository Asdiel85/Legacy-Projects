import { createAction, props } from '@ngrx/store';
import { IUser } from '../../authentication/user/models/user';

export const login = createAction(
  `[AUTH] Login`,
  props < {
    payload: {
      email: string;
      password: string;
    };
  }>()
);

export const loginSuccess = createAction(
  '[AUTH] Login Success',
  props<{
    payload: {
      loggedUser: IUser
    }
  }>()
);

export const loginFailed = createAction(
  '[AUTH] Login Failed',
  props<{
    payload: {
      error: any
    }
  }>()
);

export const logout = createAction('[AUTH] Logout');
