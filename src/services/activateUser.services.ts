

import { client } from '../database/config.database';
import  format  from 'pg-format';

const activateUserService = async (id:string) => {
   
    const queryString = format(`
    UPDATE users
    SET active = true
    WHERE id=%s`, id)

    

    const response = await client.query(queryString)
    return response;
}
 
export default activateUserService;
  