import { NextFunction, Request, Response } from "express";
import { User, UserResponse } from "../interfaces/interfaces";
import selectbyEmailService from '../services/selectbyEmail.services';
import validateTokenService from "../services/validateToken.services";
import selectbyIdService from '../services/selectbyId.services';


const userFromTokenMiddleware = async (req:Request, res:Response, next: NextFunction): Promise<void|Response> => {
    
    const user:any = validateTokenService(req.token);
    const response: User= await selectbyIdService(user.sub)
    console.log(response)
    req.loggedEmail = response.email
    return next()
}
 
export default userFromTokenMiddleware;