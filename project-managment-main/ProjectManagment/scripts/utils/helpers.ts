import {Listener, LoggedUser} from "./models";
import AuthenticationService from "../services/authenticationService";
import sideMenu from "../views/components/navigation/navigation";

/**
 * By given response return either parsed `response.json` or throws an error
 */
export async function handleResponse(response: Response) {
    if (response && response.ok) {
        return await response.json();
    } else {
        return new Error(`Failed with status code ${response.status}`);
    }
};

/**
 * Renders template by given container `selector`
 * and attaches event listeners for this template if there are any
 */
export function render(selector, renderData: { template: string, listeners: Listener[] }): void {
    const container: HTMLElement = (document.querySelector(selector) as HTMLElement);
    container.innerHTML = renderData.template;

    if (renderData && renderData.listeners && renderData.listeners.length) {
        for (const listener of renderData.listeners) {
            const target: HTMLElement = (document.getElementById(listener.targetId) as HTMLElement);
            target.addEventListener(listener.eventType, listener.callback);
        }
    }
}

export function asideMenu() {
    const loggedUser: LoggedUser = AuthenticationService.getLoggedUser();

    if (loggedUser) {

        render('.side-menu', sideMenu())

    } else {
        render('.side-menu', {template: '', listeners: []})
    }
}


export function modal(renderData: { template: string, listeners: Listener[] }): void {
    const modal: HTMLElement = document.createElement('div');
    modal.classList.add('modal');

    const modalContent: HTMLElement = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = renderData.template;

    const close: HTMLElement = document.createElement('a');
    close.classList.add('modal-close-btn');

    close.addEventListener('click', () => {
        document.body.removeChild(modal);
    })


    modal.appendChild(modalContent);
    modalContent.prepend(close);
    document.body.appendChild(modal);

    modal.addEventListener("click", function (event) {
        if (event.target == modal) {
            document.body.removeChild(modal);
        }
    });

    if (renderData && renderData.listeners && renderData.listeners.length) {
        for (const listener of renderData.listeners) {
            const target: HTMLElement = (document.getElementById(listener.targetId) as HTMLElement);
            target.addEventListener(listener.eventType, listener.callback);
        }
    }

    const submitBtn: HTMLElement = document.querySelector('.close-modal');
    submitBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    })
}

export function dateParse(date: string): Date {
    const arr: string[] = date.split(/\D/);
    let year: number = Number(arr[0]);
    let month: number = Number(arr[1]);
    let day: number = Number(arr[2]);

    return new Date(year, --month, day)
}

export function formatDate(date) {
    return date.slice(0, 10);
}