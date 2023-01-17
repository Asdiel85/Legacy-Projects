import BaseService from "./baseService";
import {URL_PROJECTS} from "../utils/constants";

class ProjectsService extends BaseService {
    constructor() {
        super(URL_PROJECTS);
    }
}

export default new ProjectsService();