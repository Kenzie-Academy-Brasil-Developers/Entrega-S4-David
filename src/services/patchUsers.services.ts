import { NextFunction, Request, Response } from "express";
import format from "pg-format";

import { UserRequest, UserResponse, UserUpdate } from "../interfaces/interfaces";
import { client } from "../database/config.database";
import AppError from "../errors/error";
import patchUserController from '../controllers/patchUser.controller';

export const patchUserService = async (
  payload: UserUpdate, id:number
): Promise<UserResponse> => {
  const body: UserUpdate = payload;

  const queryString = format(
    `
    UPDATE users 
    SET (%I) = ROW(%L)
    WHERE id=%s
    RETURNING *;
    `,
    Object.keys(body),
    Object.values(body),
    id
  );

  const response: UserResponse = await client.query(queryString);

  return response;
};

export default patchUserService
