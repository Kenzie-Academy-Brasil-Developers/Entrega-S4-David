
import { verify } from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
const validateTokenService = (payload:string):string => {
    const tokenJWT = payload
    try {
        const decoded: any = verify(tokenJWT, String(process.env.SECRET_KEY));
        return decoded;
        
      } catch (error: any) {
        throw new JsonWebTokenError(error.message);
      }
    ;
}
 
export default validateTokenService;