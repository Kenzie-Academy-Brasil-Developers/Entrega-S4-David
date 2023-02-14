import { NextFunction, Request, Response } from "express";
import { User, UserResponse } from "../interfaces/interfaces";
import { postUserService } from "../services/creation/postUser.services";
import selectbyEmailService from "../services/selectbyEmail.services";
import sanitizePasswordService from "../services/sanitizePassword.services";

const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const response: User = await selectbyEmailService(req.loggedEmail);
  const sanitizedResponse = sanitizePasswordService(response);
  return res.status(200).json(sanitizedResponse);
};

export default getUserByIdController;
