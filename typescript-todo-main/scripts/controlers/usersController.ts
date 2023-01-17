import { MAIN_CONTENT_SELECTOR } from '../utils/constants';
import {render, generateUser, formatDate} from '../utils/helpers';

import User from '../entities/User';
import { UserItem } from '../utils/models';
import UsersService from '../services/userService';
import { usersEdit } from '../views/components/users/index';
import usersPage from '../views/pages/users';

/**
 * Loads user list page
 */
export async function loadUsers(): Promise<void> {
  render(MAIN_CONTENT_SELECTOR, usersPage());

  const usersTable: HTMLElement = document.getElementById('usersTable') as HTMLElement;
  const items: Array<UserItem> = await UsersService.getAll();

  if (!items) {
    return;
  }

  for (const currentItem of items) {
    usersTable.appendChild(generateUsersRow(currentItem));
  }
}

/**
 * Generates and returns one row for users table
 */
function generateUsersRow(currentItem: UserItem): HTMLElement {
  const { id, username, firstName, lastName, createDate, updateDate } = currentItem;
  const row: HTMLElement = document.createElement('tr');

  row.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${username}</td>
      <td class="hide-user">${formatDate(createDate)}</td>
      <td class="hide-user">${formatDate(updateDate)}</td>
      <td class="action-buttons-container" colspan="2">
        <a class="action-button user-edit-button" title="Edit user"></a>
        <a class="action-button user-delete-button" title="Delete user"></a>
      </td>
  `;

  row.querySelector('.user-edit-button')
    .addEventListener('click', () => editUser(id));
  row.querySelector('.user-delete-button')
    .addEventListener('click', () => deleteUser(id));

  return row;
}

/**
 * Renders template for create user
 */
export function createNewUser(action: string): void {
  render(MAIN_CONTENT_SELECTOR, usersEdit(action));
}

/**
 * Renders template for edit user and pre fills the fields
 */
export async function editUser(id: string): Promise<void> {
  render(MAIN_CONTENT_SELECTOR, usersEdit('Edit'));
  const item: UserItem = await UsersService.getById(id);

  generateUser(item)
  
}

/**
 * Handles event for submitting the user form
 */
export async function submitUserForm(): Promise<void> {
  const id: string = (document.getElementById('id') as HTMLInputElement).value;
  const username: string = (document.getElementById('username') as HTMLInputElement).value;
  const password: string = (document.getElementById('password') as HTMLInputElement).value;
  const firstName: string = (document.getElementById('firstName') as HTMLInputElement).value;
  const lastName: string = (document.getElementById('lastName') as HTMLInputElement).value;
  const isAdmin: boolean = (document.getElementById('isAdmin') as HTMLInputElement).checked;
  const createDate: string = (document.getElementById('createDate') as HTMLInputElement).value;
  const updateDate: string = (document.getElementById('updateDate') as HTMLInputElement).value;

  const item: User = new User(id, username, password, firstName, lastName, isAdmin, createDate, updateDate);

  if (id === '') {
    await UsersService.addItem(item);
  } else {
    item.id = id;
    await UsersService.editItem(item);
  }

  await loadUsers();
}
 /* Handles event for deleting user
 */
async function deleteUser(id: string): Promise<void> {
  await UsersService.deleteItem(id);
  await loadUsers();
}