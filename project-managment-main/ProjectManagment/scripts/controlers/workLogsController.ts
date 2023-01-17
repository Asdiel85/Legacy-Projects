import {render, modal, dateParse, formatDate} from "../utils/helpers";
import {MAIN_CONTENT_SELECTOR} from "../utils/constants";
import taskDetails from "../views/components/tasks/taskDetails";
import {WorkLogItem, TaskItem} from "../utils/models";
import TaskService from "../services/taskService";
import WorkLogService from "../services/workLogService";
import workLogEdit from "../views/components/logs/workLog";
import WorkLog from "../entities/workLog";
import AuthenticationService from "../services/authenticationService";
import {statusChek} from "./tasksController";

async function generateTask(taskId: string, projectId: string) {
    const task: TaskItem = await TaskService.getTaskById(taskId, projectId);

    const taskHolder: HTMLElement = (document.createElement('div') as HTMLElement);

    taskHolder.innerHTML = `
    <span>${task.title}-${task.assigneeId}-<span class="collored">${task.status}</span></span>
    <article class="description">${task.description}</article>
    `;

    statusChek(taskHolder, task.status);

    return taskHolder;
}


function generateLog(currentItem: WorkLogItem, taskId: string) {
    const {time, date} = currentItem;

    const logHolder: HTMLElement = (document.querySelector('.workLog-holder') as HTMLElement);
    const logList: HTMLElement = (document.createElement('ul') as HTMLElement);
    logHolder.after(logList);

    logList.innerHTML = ` <li class="log task">
    <span>${time}h -${formatDate(date)}</span>
    <div class="task-action-buttons-container">
    <a class="action-button edit-icon log-edit-button"></a>
    <a class="action-button delete-icon log-delete-button"></a>
  </div>
  </li>`;

    logList.querySelector('.log-edit-button')
        .addEventListener('click', () => editWorkLog(currentItem.id, taskId));
    logList.querySelector('.log-delete-button')
        .addEventListener('click', () => {
          if(window.confirm("Delete user>"))  {
              removeWorkLog(taskId, currentItem.id)
          }
        }); 
            
}


export async function showWorkLog(taskId: string, projectId?: string): Promise<void> {
    render(MAIN_CONTENT_SELECTOR, taskDetails());

    const createLogBtn: HTMLElement = (document.getElementById('logCreateBtn') as HTMLElement);
    createLogBtn.addEventListener('click', () => createLog('Create', taskId));

    const taskHolder: HTMLElement = await generateTask(taskId, projectId);
    const taskBox: HTMLElement = (document.querySelector('.task-holder') as HTMLElement);

    taskBox.appendChild(taskHolder);

    const logs: Array<WorkLogItem> = await WorkLogService.getLogs(taskId);


    if (!logs) {
        return;
    }

    for (const log of logs) {

        generateLog(log, taskId);
    }
}


export function createLog(action: string, taskId: string): void {
    modal(workLogEdit('Create', taskId));
}

export async function editWorkLog(id: string, taskId: string) {
    modal(workLogEdit('Edit', taskId));

    const workLog: WorkLogItem = await WorkLogService.getLogById(taskId, id);
    (document.getElementById('id') as HTMLInputElement).value = workLog.id;
    (document.getElementById('number') as HTMLInputElement).value = String(workLog.time);
    (document.getElementById('start') as HTMLInputElement).value = formatDate(workLog.date);

}

export async function submitLogForm(taskId) {
    const id: string = (document.getElementById('id') as HTMLInputElement).value;
    const hours: number = +(document.getElementById('number') as HTMLInputElement).value;
    const userId: number = AuthenticationService.getLoggedUser().id;
    const date: string = (document.getElementById('start') as HTMLInputElement).value;


    const log: WorkLog = new WorkLog(id, hours, userId, dateParse(date));

    if (id === '') {

        await WorkLogService.addLog(taskId, log);
    } else {
        log.id = id;
        await WorkLogService.editLog(log, taskId, id)
    }


}

export async function removeWorkLog(taskId: string, id: string) {
    await WorkLogService.deleteLog(taskId, id);

    await showWorkLog(taskId);
}

