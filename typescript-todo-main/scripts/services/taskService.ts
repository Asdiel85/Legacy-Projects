import BaseService from './baseService';
import {URL_BASE, URL_LISTS, URL_TASKS } from '../utils/constants';
import AuthenticationService from './authenticationService';

class TasksService extends BaseService {
    constructor() {
        super(URL_TASKS)
    }
   
    public async getByParentId(id: string) {
        const response = await fetch (`${URL_BASE}${URL_LISTS}/${id}${this.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });

        return await response.json();
    }

}
export default new TasksService();