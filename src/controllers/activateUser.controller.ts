import { NextFunction, Request, Response } from "express";
import deactivateUserService from '../services/deactivateUser.services';
import activateUserService from '../services/activateUser.services';
import selectbyIdService from "../services/selectbyId.services";
import sanitizePasswordService from '../services/sanitizePassword.services';


const activateUserController = async(req:Request, res: Response,next:NextFunction) => {

    const response = await activateUserService(req.params.id)
    const userReturn = await selectbyIdService(req.params.id)
    const userReturnSanitized = sanitizePasswordService(userReturn)
    return res.status(200).json(userReturnSanitized);
}
 
export default activateUserController;