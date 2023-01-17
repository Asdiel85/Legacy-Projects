import {LoggedUser} from '../utils/models';
import UsersService from '../services/userService'
import {URL_BASE, URL_AUTH, LOGGED_USER, TOKEN} from '../utils/constants';


export default class AuthenticationService {

    /*
    * Sends request to the server for authenticating
    * If successful set 'token' and 'logged user' to sessionStorage 
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
            const result: { token: string, userId: string } = await response.json();
            const {token, userId} = result;
            window.sessionStorage.setItem(TOKEN, token);

            const loggedUser: LoggedUser = await UsersService.getById(userId)

            window.sessionStorage.setItem(LOGGED_USER, JSON.stringify({
                id: userId,
                isAdmin: loggedUser.isAdmin
            }));
        }
    };

    /*
    * Returns authorizationHeader 
     */

    public static getAuthorizationHeader(): string {
        return 'Bearer ' + window.sessionStorage.getItem(TOKEN)
    };

    /*
    * Gets and returns 'logged user' from sessionStorage 
     */
    public static getLoggedUser(): LoggedUser {
        return JSON.parse(window.sessionStorage.getItem(LOGGED_USER))
    };

    /*
     * Removes token and 'logged user' from sessionStorage
     */

    public static logout() {
        window.sessionStorage.removeItem(LOGGED_USER);
        window.sessionStorage.removeItem(TOKEN);
    };
};