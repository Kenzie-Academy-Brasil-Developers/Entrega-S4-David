import { NextFunction, Request, Response } from "express";
import { postUserService } from "../services/creation/postUser.services";
import sanitizePasswordService from "../services/sanitizePassword.services";

const postUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const response = await postUserService(req.body);
  const sanitizedResponse = sanitizePasswordService(response.rows[0]);
  return res.status(201).json(sanitizedResponse);
};

export default postUserController;
