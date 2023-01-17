import {render, modal} from "../utils/helpers";
import {MAIN_CONTENT_SELECTOR} from "../utils/constants";
import projectDetails from "../views/components/projects/projectDetails";
import {TaskItem} from "../utils/models"
import Project from "../entities/Project";
import ProjectsService from "../services/projectService";
import TasksService from "../services/taskService";
import Task from "../entities/Task";
import {taskEditPage} from "../views/components/tasks/index";
import {showWorkLog} from "./workLogsController";


/*Generates Task Box*/
function generateTask(currentItem: TaskItem, projectId: string) {
    const {id, title, description, status, assigneeId} = currentItem;

    const holder: HTMLElement = (document.querySelector('.task-holder') as HTMLElement);
    const taskList: HTMLElement = (document.createElement('ul') as HTMLElement);

    holder.after(taskList);

    taskList.innerHTML = ` <li class="task">
          <div>
          <span>${title} - ${assigneeId}-<span class="collored">${status}</span></span>
          <article class="description">${description}</article>
          </div>
          <div class="task-action-buttons-container">
          <a class="action-button edit-icon task-edit-button"></a>
          <a class="action-button delete-icon task-delete-button"></a>
        </div>
        </li>`;

    statusChek(taskList, status);

    taskList.querySelector('.task')
        .addEventListener('click', (e) => {
            e.stopPropagation();
            showWorkLog(id, projectId)
        });
    taskList.querySelector('.task-edit-button')
        .addEventListener('click', (e) => {
            e.stopPropagation();
            editTasks(id, projectId)
        });
    taskList.querySelector('.task-delete-button')
        .addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.confirm("Delete Task?")) {
                deleteTask(id, projectId)
            }
        });
}

/*Checks the status of current task*/
export function statusChek(taskList: HTMLElement, status: string) {
    const taskStatus: HTMLElement = (taskList.querySelector('.collored') as HTMLElement);
    if (status === 'pending') {
        taskStatus.classList.add('pending-status');
    } else if (status === 'In progress') {
        taskStatus.classList.add('progress');
    } else {
        taskStatus.classList.add('completed');
    }

}

/*Loads Tasks Page*/
export async function loadTasks(id: string): Promise<void> {
    render(MAIN_CONTENT_SELECTOR, projectDetails());
    const newTaskBtn: HTMLElement = (document.getElementById('taskCreateBtn'));
    newTaskBtn.addEventListener('click', () => createNewTask(id, 'Create'));

    const {project, projectBox}: { project: Project; projectBox: HTMLElement; } = await generateCurrentProjectDetails();

    const projectHolder: HTMLElement = (document.querySelector('.project-details-holder') as HTMLElement);
    projectHolder.appendChild(projectBox);

    const tasks: Array<TaskItem> = await TasksService.getByParentId(project.id);

    if (!tasks) {
        return;
    }

    for (const currentTask of tasks) {

        generateTask(currentTask, id);
    }


    async function generateCurrentProjectDetails() {

        const project: Project = await ProjectsService.getById(id);
        const projectBox: HTMLElement = (document.createElement('div') as HTMLElement);

        projectBox.innerHTML = `
     <div class="current-project-box">
     <h3>${project.title}</h3>
     <article>${project.description}</article>
     </div>
     `;

        return {project, projectBox};
    }
}

export async function createNewTask(projecId: string, action: string) {
    modal(taskEditPage('Create'));
    (document.getElementById('projectId') as HTMLInputElement).value = projecId;
}

export async function editTasks(id: string, projecId: string): Promise<void> {
    modal(taskEditPage('Edit'));

    const task: TaskItem = await TasksService.getTaskById(id, projecId);

    (document.getElementById('id') as HTMLInputElement).value = task.id;
    (document.getElementById('projectId') as HTMLInputElement).value = task.projectId;
    (document.getElementById('title') as HTMLInputElement).value = task.title;
    (document.getElementById('description') as HTMLInputElement).value = task.description;
    (document.getElementById('status') as HTMLInputElement).value = task.status;
    (document.getElementById('assigneeId') as HTMLInputElement).value = task.assigneeId;
}

export async function submitTaskForm(): Promise<void> {

    const id: string = (document.getElementById('id') as HTMLInputElement).value;
    const projecId: string = (document.getElementById('projectId') as HTMLInputElement).value;
    const title: string = (document.getElementById('title') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;
    const status: string = (document.getElementById('status') as HTMLInputElement).value;
    const assigneeId: string = (document.getElementById('assigneeId') as HTMLInputElement).value;

    const task: Task = new Task(id, projecId, title, description, status, assigneeId);

    if (id === '') {
        await TasksService.addTask(task);
    } else {
        task.id = id;
        await TasksService.editTask(task)
    }
    await (loadTasks(projecId));
}

export async function deleteTask(id: string, projectId: string) {
    await TasksService.deleteTaskItem(id, projectId);

    await loadTasks(projectId)
}

