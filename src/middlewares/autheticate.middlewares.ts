import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { string } from "zod";
import { AppError } from "../errors/error";
import selectbyIdService from "../services/selectbyId.services";
import selectbyEmailService from '../services/selectbyEmail.services';
import { User, UserResponse } from "../interfaces/interfaces";

/* A middleware that checks if the email already exists in the database. */
const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const {email} = req.body
  const loggedUser: User = await selectbyEmailService(email);
  
  const hashPassword = loggedUser.password;
  const enteredPassword = req.body.password;
  
  const passMatch: boolean = await compare(enteredPassword, hashPassword);

  if (!passMatch) {
    throw new AppError("Wrong Email/Password", 401);
  }

  const token: string = sign(
    {
      email: loggedUser.email,
    },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h", subject: String(loggedUser.id) }
  );

  
  req.token = token;
  return next();
};

export default authenticateMiddleware
