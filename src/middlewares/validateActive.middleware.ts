import { NextFunction, Request, Response } from "express";
import { User, UserResponse } from "../interfaces/interfaces";
import { AppError } from "../errors/error";
import isActiveService from '../services/isActive.services';

const validateActiveMiddleware = (mode:string, source:string) =>{
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const response = await isActiveService(source==='req'?req.params.id:req.id);
    console.log(response)
    if(mode==="active"){
      if (response.active) {
        return next();
      } else {
        throw new AppError("User is not active", 400);
    };
    }
    else if(mode==="inactive"){
      if (!response.active) {
        return next();
      } else {
        throw new AppError("User is active! ", 400);
    };
    }
  };
}

export default validateActiveMiddleware;
