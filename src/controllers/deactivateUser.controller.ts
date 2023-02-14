import { NextFunction, Request, Response } from "express";


const deactivateUserController = (req:Request, res: Response,next:NextFunction) => {
    return res.status(200).json({message:"chegou ao fim da requisição"});
}
 
export default deactivateUserController;