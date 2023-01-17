import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';


export interface IState {
  userId: string;
  email: string;
}

const initialState = {
  userId: null,
  email: null
};

const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, {payload}) => ({
    ...state,
    loggedIn: true,
    loggedUser: payload.loggedUser
  })),
  on(logout, (state) => ({
    ...state,
    loggedIn: false,
    loggedUser: null
  }))
);

export function authenticationReducer(state, action) {
  return authReducer(state, action);
}
