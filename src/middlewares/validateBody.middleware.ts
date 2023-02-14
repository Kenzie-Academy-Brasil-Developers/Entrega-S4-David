import { NextFunction, Request, Response } from "express"
import { UserRequest, UserResponse } from '../interfaces/interfaces';
import { ZodTypeAny } from "zod";



const validateBodyMiddleware = (schemaParam:ZodTypeAny) =>{
   return async(req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
        const payload = req.body
        const schema = schemaParam
        const validated: UserRequest = schema.parse(payload)
        req.body = validated;
        return next();
    
    }
} 

export default validateBodyMiddleware