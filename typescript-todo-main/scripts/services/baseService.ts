import AuthenticationService from "../services/authenticationService";
import { URL_BASE, URL_LISTS} from "../utils/constants";
import { handleResponse } from '../utils/helpers';


export default class BaseService {

    protected url: string;
    constructor(url:string) {
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
          'Authorization': await AuthenticationService.getAuthorizationHeader()
        },
      });
  
      return handleResponse(response);
    }
  
    /**
   * Request to server for editing item,parentId for tasks
   */
    public async editItem(item : any) {
      event.preventDefault();
      const urlItem = this.editUrl(item)
  
      await fetch(urlItem, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AuthenticationService.getAuthorizationHeader()
        },
        body: JSON.stringify(item)
      });
    }
    
    
    /**
     * Request to server for getting item by id, added parentId for tasks
     */
    public async getById(id:string, parentId?:string) {
      const getUrl = this.idUrl(parentId, id);
      
      
      const response = await fetch(getUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await AuthenticationService.getAuthorizationHeader()
        },
      });
      
      return handleResponse(response);
    }
    
    
    /**
     * Request to server for adding item
     */
    public async addItem(item) {
      event.preventDefault();
      const urlItem = this.addItemUrl(item)
      
      await fetch(urlItem, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  await AuthenticationService.getAuthorizationHeader()
        },
        body: JSON.stringify(item)
      });
    }
    
    
    /**
     * Request to server for deleting item by id
     */
    public async deleteItem(id:string, parentId?:string) {
      event.preventDefault();
      const getUrl= this.deleteUrl(parentId, id);
      
      await fetch(getUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await AuthenticationService.getAuthorizationHeader()
        },
      });
    }

     /*
     *Request the url for getting item by id/parentId
    */
   private deleteUrl(parentId: string, id: string) {
    return typeof parentId === 'undefined'
      ? `${URL_BASE}${this.url}/${id}`
      : `${URL_BASE}${URL_LISTS}/${parentId}${this.url}/${id}`;
    }

     /*
     *Request the url for getting item by id/parentId
    */ 
    private idUrl(parentId: string, id: string) {
      return typeof parentId === 'undefined'
        ? `${URL_BASE}${this.url}/${id}`
        : `${URL_BASE}${URL_LISTS}/${parentId}${this.url}/${id}`;
    }
    /*
     *Request the url for edit item 
    */
    private addItemUrl(item: any) {
          return typeof item.taskListId === 'undefined'
            ? `${URL_BASE}${this.url}/`
            : `${URL_BASE}${URL_LISTS}/${item.taskListId}${this.url}`
      
            ;
        }
    
    /* 
    *Request the url for edit item 
    */
    private editUrl(item: any) {
      return typeof item.taskListId === 'undefined'
      ? `${URL_BASE}${this.url}/${item.id}`
      : `${URL_BASE}${URL_LISTS}/${item.taskListId}${this.url}/${item.id}`
      
      ;
    }
    
  }