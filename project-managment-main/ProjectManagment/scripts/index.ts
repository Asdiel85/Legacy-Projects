import '../styles/styles.css';
import {render, asideMenu} from "./utils/helpers";
import AuthenticationService from "./services/authenticationService";

import login from "./views/pages/login";

import {MAIN_CONTENT_SELECTOR} from "./utils/constants";
import {loadProjects} from "./controlers/projectsController";


window.addEventListener('DOMContentLoaded', init);

async function init(): Promise<void> {
    const loggedUser = AuthenticationService.getLoggedUser();

    if (!loggedUser) {
        render(MAIN_CONTENT_SELECTOR, login())
    } else {
        await loadProjects()
    }
    asideMenu()
}
