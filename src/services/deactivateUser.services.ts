

import { client } from '../database/config.database';
import  format  from 'pg-format';

const deactivateUserService = async (id:string) => {
   
    const queryString = format(`
    UPDATE users
    SET active = false
    WHERE id=%s`, id)

    const response = await client.query(queryString)
    return response;
}
 
export default deactivateUserService;
  