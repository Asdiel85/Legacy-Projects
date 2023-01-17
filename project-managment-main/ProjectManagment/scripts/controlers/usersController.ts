import {UserItem} from "../utils/models";
import {render, modal} from "../utils/helpers";
import {MAIN_CONTENT_SELECTOR} from "../utils/constants";
import users from "../views/pages/users";
import UsersService from "../services/userService";
import User from "../entities/User";
import userEdit from "../views/components/users/userEdit";

function generateUsers(currentUser: UserItem): HTMLElement {
    const {id, firstName, lastName, username,} = currentUser;

    const userRow: HTMLElement = document.createElement('tr') as HTMLElement;


    userRow.innerHTML = `
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${username}</td>
    <td class = "action-buttons-container" colspan="2">
    <a class="edit-icon action-button user-edit-button" title="Edit user"></a>
    <a class="delete-icon action-button user-delete-button" title="Delete contact"></a>
    </td>
    `;
    userRow.querySelector('.user-edit-button')
        .addEventListener('click', () => editUser(id));
    userRow.querySelector('.user-delete-button')
        .addEventListener('click', () => {
            if (window.confirm("Delete user?")) {
                deleteUser(id)
            }
        });


    return userRow;
}

export async function loadUsers(): Promise<void> {
    render(MAIN_CONTENT_SELECTOR, users());

    const usersTable: HTMLElement = (document.getElementById('usersTable') as HTMLElement);
    const items: Array<UserItem> = await UsersService.getAll();

    if (!items) {
        return;
    }

    for (const currentItem of items) {
        usersTable.appendChild(generateUsers(currentItem));
    }
}


export async function createNewUser(): Promise<void> {
    modal(userEdit('Create'));
}


export async function editUser(id: string): Promise<void> {
    modal(userEdit('Edit'));
    const user: UserItem = await UsersService.getById(id);

    (document.getElementById('id') as HTMLInputElement).value = user.id;
    (document.getElementById('firstName') as HTMLInputElement).value = user.firstName;
    (document.getElementById('lastName') as HTMLInputElement).value = user.lastName;
    (document.getElementById('username') as HTMLInputElement).value = user.username;
    (document.getElementById('password') as HTMLInputElement).value = user.password;
    (document.getElementById('isAdmin') as HTMLInputElement).checked = user.isAdmin;

}

export async function submitUserFom(): Promise<void> {
    const id: string = (document.getElementById('id') as HTMLInputElement).value;
    const firstName: string = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName: string = (document.getElementById('lastName') as HTMLInputElement).value;
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    const isAdmin: boolean = (document.getElementById('isAdmin') as HTMLInputElement).checked;

    const user: User = new User(id, firstName, lastName, username, password, isAdmin);

    if (id === '') {
        await UsersService.addItem(user);
    } else {
        user.id = id;
        await UsersService.editItem(user);
    }

    loadUsers();
}

export async function deleteUser(id: string): Promise<void> {
    await UsersService.deleteItem(id);

    loadUsers();
}