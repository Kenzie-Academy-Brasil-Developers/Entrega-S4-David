import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database/config.database";
import { UserResponse } from "../interfaces/interfaces";
import { AppError } from "../errors/error";
import selectbyEmailService from "../services/selectbyEmail.services";

/* A middleware that checks if the email already exists in the database. */
const checkEmailExistenceMiddleware = (type: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const { email } = req.body;
    const response = await selectbyEmailService(email);

    if (type === "unique") {
      if (response) {
        throw new AppError("Email already registered", 409);
      } else {
        next();
      }
    } else if (type === "exists") {
      if (!response) {
        throw new AppError("Email not registered!", 404);
      } else {
        req.searchedUser = response;
        next();
      }
    } else if (type === "existsLogin") {
      if (!response) {
        throw new AppError("Wrong Email/Password", 401);
      } else {
        req.loggedEmail = req.body;
        req.id = response.id.toString()
        next();
      }
    }
  };
};

export default checkEmailExistenceMiddleware;
