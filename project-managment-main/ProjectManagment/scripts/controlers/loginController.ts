import AuthenticationService from "../services/authenticationService";
import {LoggedUser} from "../utils/models";
import {loadProjects} from "./projectsController";
import {MAIN_CONTENT_SELECTOR} from "../utils/constants";
import {render, asideMenu} from "../utils/helpers";
import login from "../views/pages/login";

/*Handles Login Event*/
export async function submitLoginForm(): Promise<void> {
    event.preventDefault();

    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;

    try {
        await AuthenticationService.authenticate(username, password);
        const loggedUser: LoggedUser = AuthenticationService.getLoggedUser();

        if (!loggedUser) {
            (document.getElementById('error') as HTMLElement).innerHTML = 'User doesn\'t exist';
        } else {
            await loadProjects();
            asideMenu();
        }
    } catch (error) {
        console.log('Error:' + error);
    }
}

/**
 * Handle the event for logout
 */
export function logout(): void {
    AuthenticationService.logout();
    asideMenu()
    render(MAIN_CONTENT_SELECTOR, login());
}