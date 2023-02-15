import { NextFunction, Request, Response } from "express";
import { Admin, User } from "../interfaces/interfaces";
import selectbyEmailService from '../services/selectbyEmail.services';
import validateTokenService from '../services/validateToken.services';
import isAdminService from '../services/isAdmin.services';
import { AppError } from '../errors/error';
import selectbyIdService from '../services/selectbyId.services';

const validateEditPermissions = async(req:Request, res:Response, next:NextFunction) => {

    const localLogged: any = validateTokenService(req.token);
   
    const loggedUser:User = await selectbyIdService(localLogged.sub)
    const searchedId = req.searchedId

    console.log(loggedUser.id === searchedId)
    console.log(loggedUser.id)
    console.log(searchedId)
    if(loggedUser.id === searchedId){
        return next()
    }
    else{
        const isAdmin:Admin = await isAdminService(loggedUser.email)
        if(isAdmin.admin){
            return next()
        }
        else {
            throw new AppError("Insufficient Permissions",403)
        }
    }
    return   ;
}
 
export default validateEditPermissions;