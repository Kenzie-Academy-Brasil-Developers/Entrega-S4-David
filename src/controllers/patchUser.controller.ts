
import { NextFunction, Request, Response } from "express";
import { postUserService } from "../services/creation/postUser.services";
import patchUserService from "../services/patchUsers.services";
import sanitizePasswordService from "../services/sanitizePassword.services";

const patchUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const response = await patchUserService(req.body, Number(req.params.id));
  const sanitizedResponse = sanitizePasswordService(response.rows[0]);
  return res.status(201).json(sanitizedResponse);
};

export default patchUserController;
