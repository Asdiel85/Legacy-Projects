import { loadUsers } from '../../../controlers/usersController';
import { loadLists} from '../../../controlers/listsControllers';
import { logout } from '../../../controlers/loginController';

export default function navigation() {
  return {
    template: `<nav class="header-menu">
          <ul>
            <li id="listsLink" class="nav-item"><a class="active nav-link">Home</a></li>
            <li id="usersLink" class="nav-item"><a class="nav-link">Users</a></li>
            <li id="logoutLink" class="nav-item"><a class="nav-link">Sign Out</a></li>
          </ul>
        </nav>`,
    listeners: [
      {
        targetId: 'usersLink',
        eventType: 'click',
        callback: loadUsers
      }, {
        targetId: 'listsLink',
        eventType: 'click',
        callback: loadLists
      }, {
        targetId: 'logoutLink',
        eventType: 'click',
        callback: logout
      }
    ]
  };
}