import { loadProjects } from "../../../controlers/projectsController";
import { logout } from "../../../controlers/loginController";
import { loadUsers } from "../../../controlers/usersController";
import { loadTeams } from "../../../controlers/teamsController";
import AuthenticationService from "../../../services/authenticationService";
import { UserItem } from "../../../utils/models";

export default function sideMenu() {
   const user =  AuthenticationService.getLoggedUser();
   if(user.isAdmin) {
    return {
        template:  `
        <div class="navigation" id="secondNav">
        <a class="logo"><span><span class="logo-img"></span>AppStack</span></a>
        <ul class="side-list">
            <li id="projects"> <a class="nav-icon projects"></a>Projects</li>
            <li id="users"> <a class="nav-icon users"></a>Users</li>
            <li id="teams"> <a class="nav-icon teams"></a>Teams</li>
            <li id="signOut"><a class="nav-icon sign-out"></a>Sign out</li>
        </ul>
        </div>
        `,
        listeners: [
            {
            targetId: 'projects',
            eventType: 'click',
            callback: loadProjects
            },
            {
                targetId: 'signOut',
                eventType: 'click',
                callback: logout
            },
            {
                targetId: 'users',
                eventType: 'click',
                callback: loadUsers
                },
                {
                    targetId: 'teams',
                    eventType: 'click',
                    callback: loadTeams
                }
            ]
    }
}
else {
    return {
        template:  `
        <div class="navigation" id="secondNav">
        <a class="logo"><span>AppStack</span></a>
        <ul class="side-list">
            <li id="projects"> <a class="projects"></a>Projects</li>
            <li id="signOut"><a class="sign-out"></a>Sign out</li>
        </ul>
        </div>
        `,
        listeners: [
            {
            targetId: 'projects',
            eventType: 'click',
            callback: loadProjects
            },
            {
                targetId: 'signOut',
                eventType: 'click',
                callback: logout
            },
            ]
         }
    }
}
export function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  document.getElementById('secondNav').style.display = 'none';
  document.body.classList.remove('menu-open');
  }
  
  const closeBtn:HTMLElement = (document.querySelector('.closebtn')as HTMLElement);
  
  closeBtn.addEventListener('click', () => {
    closeNav()
  });

  function openNav() {
    document.getElementById("mySidenav").style.width = "260px";
    document.getElementById('secondNav').style.display = 'block';
    document.body.classList.add('menu-open');
  }

  const showBtn:HTMLElement = (document.getElementById('showNavigation'));

  showBtn.addEventListener('click', () => {
      openNav()
  });