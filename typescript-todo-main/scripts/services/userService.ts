import { URL_USERS } from '../utils/constants';
import BaseService from '../services/baseService';

class UsersService extends BaseService {
  constructor() {
    super(URL_USERS);
  }
}

export default new UsersService();