import { Request, Response } from "express";
import { UserSanitized } from "../interfaces/interfaces";
import getAllService from '../services/getAll.services';
import sanitizePasswordService from '../services/sanitizePassword.services';


const getAllController = async (req:Request, res:Response):Promise<Response> => {
    const response = await getAllService()


    return res.status(200).json(response.rows)
    
}
 
export default getAllController;