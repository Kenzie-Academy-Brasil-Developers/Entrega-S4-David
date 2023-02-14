import { NextFunction, Request, Response } from "express"
import { UserRequest, UserResponse } from '../interfaces/interfaces';
import { ZodTypeAny } from "zod";
import { hash } from "bcryptjs";



const cryptographPasswordMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
        const payload: UserRequest = req.body
        if(payload.hasOwnProperty('password')){
            const hashedPass:string = await hash(payload.password, 10)
            payload.password = hashedPass
            req.body = payload
            return next();
        }
        return next();
    
    }


export default cryptographPasswordMiddleware