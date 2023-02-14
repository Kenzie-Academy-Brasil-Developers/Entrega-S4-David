import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/error";
import selectbyIdService from "../services/selectbyId.services";


const checkIdExistenceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { id } = req.params;

  const response = await selectbyIdService(id);

  if (!response) {
    throw new AppError("No user with this ID", 404);
  } else {
    req.searchedId = response.id;
    next();
  }
};

export default checkIdExistenceMiddleware;
