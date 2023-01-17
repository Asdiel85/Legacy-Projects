import BaseService from '../services/baseService';

import { URL_LISTS} from "../utils/constants";

class ListsService extends BaseService {

    constructor() {
        super(URL_LISTS)
    }       
}

export default new ListsService ();