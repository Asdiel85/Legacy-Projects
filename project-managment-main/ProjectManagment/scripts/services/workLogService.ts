import BaseService from "./baseService";
import {URL_WORKLOG, URL_BASE, URL_TASKS} from "../utils/constants";
import AuthenticationService from "./authenticationService";
import {handleResponse} from "../utils/helpers";
import WorkLog from "../entities/workLog";
import {WorkLogItem} from "../utils/models";

class WorkLogService extends BaseService {
    constructor() {
        super(URL_WORKLOG);
    }

    /*Gets the logs for current task */
    public async getLogs(id: string): Promise<any> {
        const response = await fetch(`${URL_BASE}${URL_TASKS}/${id}${this.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });

        return handleResponse(response);
    }

    public async addLog(taskId: string, item: WorkLog): Promise<void> {
        await fetch(`${URL_BASE}${URL_TASKS}/${taskId}${URL_WORKLOG}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });
    }


    public async getLogById(taskId: string, id: string) {
        const response = await fetch(`${URL_BASE}${URL_TASKS}/${taskId}${URL_WORKLOG}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            }
        });

        return handleResponse(response);
    }

    public async editLog(item: WorkLog, taskId, id) {

        await fetch(`${URL_BASE}${URL_TASKS}/${taskId}${URL_TASKS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });
    }

    public async deleteLog(taskId, id): Promise<void> {

        await fetch(`${URL_BASE}${URL_TASKS}/${taskId}${URL_WORKLOG}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            }
        });
    }
}

export default new WorkLogService();