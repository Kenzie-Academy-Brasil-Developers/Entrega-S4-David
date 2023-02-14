import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { AppError, uniqueErrorHandler } from "../errors/error";
import validateTokenService from '../services/validateToken.services';

/* A middleware that checks if the email already exists in the database. */
const authorizateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const token: string | undefined = req.headers.authorization;

  if (!token) throw new AppError("Missing Bearer Token", 401);

  const tokenJWT = token.split(" ")[1];

  if (!tokenJWT) throw new AppError("Missing Bearer Token", 401);

  validateTokenService(tokenJWT)

  req.token = tokenJWT
  return next();
};

export default authorizateMiddleware;
