import AuthenticationService from './authenticationService';

import {URL_BASE} from '../utils/constants';
import {handleResponse} from '../utils/helpers';

export default class BaseService {
    protected url: string;

    constructor(url: string) {
        this.url = url;
    }

    /**
     * Request to server for all items
     */
    public async getAll() {
        const response = await fetch(`${URL_BASE}${this.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            }
        });

        return handleResponse(response);
    }

    /**
     * Request to server for getting item by id
     */
    public async getById(id: string) {
        const response = await fetch(`${URL_BASE}${this.url}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            }
        });

        return handleResponse(response);
    }


    /**
     *
     * Request to the server for adding item
     */
    public async addItem(item: any) {
        event.preventDefault();
        await fetch(`${URL_BASE}${this.url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });
    }


    /**
     * Request to server for editing item
     */
    public async editItem(item: any) {
        event.preventDefault();
        await fetch(`${URL_BASE}${this.url}/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });
    }

    /**
     * Request to server for deleting item by id
     */
    public async deleteItem(id: string): Promise<any> {
        event.preventDefault();
        await fetch(`${URL_BASE}${this.url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            }
        });
    }
          /*Assigns team to project or member to team*/
    public async assignToParrent(parrentId: string, childId: string, childName: string): Promise<void> {
        const object = {};
        object[childName] = childId;

        await fetch(`${URL_BASE}${this.url}/${parrentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(object)
        });
    }
}