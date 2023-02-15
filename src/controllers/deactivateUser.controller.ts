import { NextFunction, Request, Response } from "express";
import deactivateUserService from '../services/deactivateUser.services';


const deactivateUserController = async(req:Request, res: Response,next:NextFunction) => {

    const response = await deactivateUserService(req.params.id)
    return res.status(204).send();
}
 
export default deactivateUserController;