import { Request, Response } from "express";
import { NextFunction } from "express";

import { z } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const uniqueErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof z.ZodError) {
    return res.status(400).json(err.flatten().formErrors.length>0?{message:err.flatten().formErrors}:{message:err.flatten().fieldErrors});
  } else if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: err.message });
  } else {
      if(err.message === "Cannot read properties of undefined (reading 'id')"){
        return res.status(500).json({message:"updated own e-mail and must generate another JWT token to authenticate."});}
        return res.status(500).json({message:err.message});} 
};

export default AppError;
