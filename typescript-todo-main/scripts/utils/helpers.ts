import AuthenticationService from '../services/authenticationService';
import {Listener, ListItem, LoggedUser, TaskItem, UserItem} from './models';
import navigation  from '../views/components/navigation/navigation';




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

/**
 * Based on logged user handles if the navigation should be rendered or not
 */
export function handleNavigation(): void {
  const loggedUser: LoggedUser = AuthenticationService.getLoggedUser();

  if (loggedUser) {
    render('.nav-container', navigation());
  } else {
    render('.nav-container', { template: '', listeners: [] });
  }
}

/**
 * By given response return either parsed `response.json` or throws an error
 */
export async function handleResponse(response: Response) {
  if (response && response.ok) {
    return await response.json();
  } else {
    return new Error(`Failed with status code ${response.status}`);
  }
}

export function generateList(item: ListItem) {
   
  

    (document.getElementById('id') as HTMLInputElement).value = item.id;
    (document.getElementById('title') as HTMLInputElement).value = item.title;
    (document.getElementById('createDate') as HTMLInputElement).value = item.createDate;
    (document.getElementById('updateDate') as HTMLInputElement).value = item.updateDate; 

  }


  export function generateTask(item: TaskItem)  {

    (document.getElementById('id') as HTMLInputElement).value = item.id;
    (document.getElementById('taskListId') as HTMLInputElement).value = item.taskListId;
    (document.getElementById('title') as HTMLInputElement).value = item.title;
    (document.getElementById('description') as HTMLInputElement).value = item.description;
    (document.getElementById('isComplete') as HTMLInputElement).checked = item.isComplete;
  }

  export function generateUser(item: UserItem) {

    (document.getElementById('id') as HTMLInputElement).value = item.id;
    (document.getElementById('username') as HTMLInputElement).value = item.username;
    (document.getElementById('password') as HTMLInputElement).value = item.password;
    (document.getElementById('firstName') as HTMLInputElement).value = item.firstName;
    (document.getElementById('lastName') as HTMLInputElement).value = item.lastName;
    (document.getElementById('isAdmin') as HTMLInputElement).checked = item.isAdmin;
    (document.getElementById('createDate') as HTMLInputElement).value = item.createDate;
    (document.getElementById('updateDate') as HTMLInputElement).value = item.updateDate;
  }
/**
 * Handles date formating 
 */
  export function getDate(dateToday) {
    var d = new Date();
    var dateToday: any = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    
        return dateToday;
    }
      
 export function formatDate(date) {
        return date.slice(0, 10);
    }