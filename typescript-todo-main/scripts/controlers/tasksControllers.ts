import {MAIN_CONTENT_SELECTOR} from '../utils/constants';
import {render, generateTask} from '../utils/helpers';

import List from '../entities/List';
import ListsService from '../services/listService';
import {listsDetailsPage} from '../views/components/lists/index';

import Task from '../entities/Task';
import {TaskItem} from '../utils/models';
import TasksService from '../services/taskService';
import {tasksEditPage} from '../views/components/tasks/index';
import { editList, deleteList } from './listsControllers';


/**
 * Generates and returns one row for tasks table
 */
function generateTasksRow(currentItem: TaskItem, taskListId: string): HTMLElement {
    const {id, title, description} = currentItem;


    const row: HTMLElement = document.querySelector('.tasks') as HTMLElement;
    const taskList: HTMLElement= document.createElement('ul') as HTMLElement;
    row.after(taskList)

    taskList.innerHTML = `<li class="task">
            <div class="list-form task-container">
            <div>
      <input class="checkbox" type= "checkbox" ${currentItem.isComplete ? 'checked' : ''} disabled  id="isComplete">             
      <label for ="isComplete">${title}</label>
      <p>${description}</p>
      </div>
      <div class="action-buttons-container">
        <a class="action-button task-edit-button"></a>
        <a class="action-button task-delete-button"></a>
      </div>
      </div></li>`;

   
    taskList.querySelector('.task-edit-button')
        .addEventListener('click', () => editTask(id, taskListId));
    taskList.querySelector('.task-delete-button')
        .addEventListener('click', () => deleteTask(id, taskListId));

    return taskList;
}
/**
 * Generates message for no tasks in the current list
**/
function emptyTaskMessage() {
    const taskDiv: HTMLElement = document.querySelector('.tasks') as HTMLElement;
    const messageDiv: HTMLElement = document.createElement('h2') as HTMLElement;
    messageDiv.innerText = 'The TODO list is empty';
    taskDiv.after(messageDiv);
}

/**
 * Renders tasks table
 */
export async function loadTasks(id: string): Promise<void> {
    render(MAIN_CONTENT_SELECTOR, listsDetailsPage());
    const newTaskLink: HTMLElement = (document.getElementById('newTaskLink') as HTMLElement);
    newTaskLink.addEventListener('click', () => createNewTask(id, 'Add'));

    const {item, listRow}: { item: List; listRow: HTMLElement; } = await generateCurrentListDetails();

    const tasksTable: HTMLElement = document.getElementById('tasksTable') as HTMLElement;
    const tasks: Array<TaskItem> = await TasksService.getByParentId(item.id);

    tasksTable.appendChild(listRow);

    if (tasks.length === 0) {
        emptyTaskMessage();
        return;
    }

    for (const currentTask of tasks) {

       (generateTasksRow(currentTask, id));
    }


    /**
     * Returns list details of current tasks that they belong to
     */
    async function generateCurrentListDetails() {
        const item: List = await ListsService.getById(id);

        const listRow: HTMLElement = (document.createElement('div') as HTMLElement);

        listRow.innerHTML = `
<div class="list-form list-container">
 <div class="list-date">
  <h3>${item.title}</h3>
  <p>Date of creation: ${item.createDate}</p>
  <p>Date of last edit: ${item.updateDate}</p> 
  </div>
    <div class="action-buttons-container tasks-page-buttons">
    <a class="action-button list-edit-button" title="Edit List"></a>
    <a class="action-button list-delete-button" title="Delete List"></a>
    </div>
  </div>
  `;
  
  listRow.querySelector('.list-edit-button')
  .addEventListener('click', () => editList(item.id));
listRow.querySelector('.list-delete-button')
  .addEventListener('click', () => deleteList(item.id));
  
        return {item, listRow};
    }
}

/**
 * Renders the template for create task
 */
export function createNewTask(taskListId: string, action: string): void {
    render(MAIN_CONTENT_SELECTOR, tasksEditPage(action));
    (document.getElementById('taskListId') as HTMLInputElement).value = taskListId;
}

/**
 * Renders the template for edit task
 */
export async function editTask(id: string, taskListId: string): Promise<void> {
    createNewTask(id, 'Edit');
    (document.getElementById('taskListId') as HTMLInputElement).value = taskListId;

    const item: TaskItem = await TasksService.getById(id, taskListId);

    generateTask(item);
}

/**
 * Handles the event for submitting tasks form
 */
export async function submitTasksForm(): Promise<void> {

    const id: string = (document.getElementById('id') as HTMLInputElement).value;
    const taskListId: string = (document.getElementById('taskListId') as HTMLInputElement).value;
    const title: string = (document.getElementById('title') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;
    const isComplete:boolean = (document.getElementById('isComplete') as HTMLInputElement).checked
    const createDate: string = (document.getElementById('createDate') as HTMLInputElement).value;
    const updateDate: string = (document.getElementById('updateDate') as HTMLInputElement).value;

    const item: Task = new Task(id, taskListId, title, description, isComplete, createDate, updateDate);

    if (id === '') {
        await TasksService.addItem(item);
    } else {
        item.id = id;
        await TasksService.editItem(item);
    }

    await loadTasks(taskListId);
}

/**
 * Handles the event for deleting task
 */
export async function deleteTask(id: string, taskListId: string): Promise<void> {
    await TasksService.deleteItem(id, taskListId);

    await loadTasks(taskListId);
}
