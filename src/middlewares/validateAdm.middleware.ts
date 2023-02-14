import { NextFunction, Request, Response } from "express";
import { User, UserResponse } from "../interfaces/interfaces";
import { AppError } from "../errors/error";
import isAdminService from '../services/isAdmin.services';
import selectbyEmailService from '../services/selectbyEmail.services';

const validateAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: User = await selectbyEmailService(req.loggedEmail);

  const response = await isAdminService(loggedUser.email)

  if (response) {
    return next();
  } else {
    throw new AppError("Insufficient Permission", 401);
  }
  return;
};

export default validateAdmMiddleware;
