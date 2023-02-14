import { NextFunction, Request, Response } from "express";
import { User, UserResponse } from "../interfaces/interfaces";
import { postUserService } from "../services/creation/postUser.services";
import loginService from "../services/login/login.services";
import selectbyEmailService from "../services/selectbyEmail.services";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const loggedUser: User = await selectbyEmailService(req.body.email);
  const response = loginService(loggedUser);
  return res.status(200).json(response);
};

export default loginController;
