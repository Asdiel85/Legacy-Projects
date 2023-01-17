import BaseService from "./baseService";

import {URL_PROJECTS, URL_BASE, URL_TASKS} from "../utils/constants";
import AuthenticationService from "./authenticationService";
import Task from "../entities/Task";
import {handleResponse} from "../utils/helpers";

class TasksService extends BaseService {
    constructor() {
        super(URL_TASKS)
    }

    /*Get the current "child" by the Id of parent*/
    public async getByParentId(id: string): Promise<any> {
        const response = await fetch(`${URL_BASE}${URL_PROJECTS}/${id}${this.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });

        return await response.json();
    }

    /*Adds task to current project*/
    public async addTask(item: Task) {
        await fetch(`${URL_BASE}${URL_PROJECTS}/${item.projectId}${URL_TASKS}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': await AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });
    }

    /*Edit the current task*/
    public async editTask(item: Task) {
        await fetch(`${URL_BASE}${URL_PROJECTS}/${item.projectId}${URL_TASKS}/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });
    }

    /*Request to the server for task*/
    public async getTaskById(id: string, projectId: string): Promise<any> {
        const response = await fetch(`${URL_BASE}${URL_PROJECTS}/${projectId}${this.url}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            }
        });

        return handleResponse(response);
    }

    /*Deletes the current task*/
    public async deleteTaskItem(id: string, parenId: string) {
        await fetch(`${URL_BASE}${URL_PROJECTS}/${parenId}${this.url}/${id}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': await AuthenticationService.getAuthorizationHeader()
            },
        });
    }
}

export default new TasksService();