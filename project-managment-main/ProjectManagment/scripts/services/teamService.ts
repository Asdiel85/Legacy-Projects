import BaseService from "./baseService";
import {URL_TEAMS, URL_BASE, URL_MEMBERS} from "../utils/constants";
import AuthenticationService from "./authenticationService";
import {handleResponse} from "../utils/helpers";

class TeamsService extends BaseService {
    constructor() {
        super(URL_TEAMS)
    }

    /*Gets current team members*/
    public async getMembers(id: string): Promise<any> {
        const response = await fetch(`${URL_BASE}${URL_TEAMS}/${id}${URL_MEMBERS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });
        return handleResponse(response);
    }
}

export default new TeamsService();
