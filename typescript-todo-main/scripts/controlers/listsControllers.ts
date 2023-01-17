import AuthenticationService from '../services/authenticationService';
import { MAIN_CONTENT_SELECTOR } from '../utils/constants';
import { render, generateList, formatDate } from '../utils/helpers';

import List from '../entities/List';
import {ListItem, LoggedUser, UserItem} from '../utils/models';
import ListsService from '../services/listService';
import lists from '../views/pages/lists';
import { listsEditPage } from '../views/components/lists/index';

import { loadTasks } from './tasksControllers';
import User from "../entities/User";

/**
 * Generates and returns one row for lists table
 */
async function generateListsRow(currentItem: ListItem): Promise<HTMLElement> {
  const { id, title, createDate, updateDate} = currentItem;
  const { list } = await ListsService.getAll()

  const row: HTMLElement = document.createElement('tr');

  row.innerHTML = `
      <td>${title}</td>
      <td>${formatDate(createDate)}</td>
      <td class ="hide-list">${formatDate(updateDate)}</td>
      <td class="action-buttons-container" colspan="3">
         <a href="#" class="action-button list-details-button" title="Show details"></a>
        <a href="#" class="action-button list-edit-button" title="Edit List">
        <a href="#" class="action-button list-delete-button" title="Delete List"> 
      </td>
   `;

  row.querySelector('.list-details-button')
      .addEventListener('click', () => loadTasks(id));
  row.querySelector('.list-edit-button')
      .addEventListener('click', () => editList(id));
  row.querySelector('.list-delete-button')
      .addEventListener('click', () => deleteList(id));

  return row;
}

/**
 * Loads list page
 */
export async function loadLists(): Promise<void> {
  render(MAIN_CONTENT_SELECTOR, lists());

  const listsTable: HTMLElement = (document.querySelector('#listsTable tbody') as HTMLElement);
  const loggedUser: LoggedUser = AuthenticationService.getLoggedUser();
  const items: Array<ListItem> = await ListsService.getAll();

  if (!items) {
    return;
  }

  for (const item of items) {
    listsTable.appendChild(await generateListsRow(item));
  }
}

/**
 * Renders template for create list
 */
export function createNewList(action: string): void {
  render(MAIN_CONTENT_SELECTOR, listsEditPage(action));
}

/**
 * Renders template for edit list and pre fills the fields
 */
export async function editList(id: string): Promise<void> {
  createNewList('Edit');
  const item: List = await ListsService.getById(id);
  generateList(item);
}


/**
 * Handles event for submitting the list form
 */
export async function submitListForm(): Promise<void> {
  const id: string = (document.getElementById('id') as HTMLInputElement).value;
  const title: string = (document.getElementById('title') as HTMLInputElement).value;
  const createDate: string = (document.getElementById('createDate') as HTMLInputElement).value
  const updateDate: string = (document.getElementById('updateDate') as HTMLInputElement).value



  const item: List = new List(id, title, createDate, updateDate);

  if (id === '') {
    await ListsService.addItem(item);
  } else {
    item.id = id;
    await ListsService.editItem(item);
  }

  await loadLists();
}

/**
 * Handles event for deleting list
 */
export async function deleteList(id: string): Promise<void> {
  await ListsService.deleteItem(id);

  await loadLists();
}

