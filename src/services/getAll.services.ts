
import { client } from '../database/config.database';

const getAllService = async () => {
   
    const queryString =`
    SELECT id, name, email, active, admin FROM users`

    const response = await client.query(queryString)
    return response;
}
 
export default getAllService;