import UsersService from './userService';
import { LoggedUser } from '../utils/models';

import { URL_AUTH, URL_BASE, TOKEN, LOGGED_USER } from '../utils/constants';

export default class AuthenticationService {
  /**
   * Send request to server for authenticating
   * If it was successful sets `token` and `logged user` to sessionStorage
   */
  public static async authenticate(username: string, password: string) {
    const response: Response = await fetch(URL_BASE + URL_AUTH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response && response.ok) {
      const result: { token: string, userId: string} = await response.json();
      const { token, userId } = result;
      window.sessionStorage.setItem(TOKEN, token);

      const loggedUser: LoggedUser = await UsersService.getById(userId);

      window.sessionStorage.setItem(LOGGED_USER, JSON.stringify({
        id: userId,
        isAdmin: loggedUser.isAdmin,
      }));
    }
  }

  /**
   * Gets and returns `logged user` from sessionStorage
   */
  public static getLoggedUser(): LoggedUser {
    return JSON.parse(window.sessionStorage.getItem(LOGGED_USER));
  }

  /**
   * Removes `token` and `logged user` from sessionStorage
   */
  public static logout() {
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.removeItem(TOKEN);
  }

  /**
   * Returns authorization header
   */
  public static getAuthorizationHeader(): string {
    return 'Bearer ' + window.sessionStorage.getItem(TOKEN);
  }
}