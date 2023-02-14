import { NextFunction, Request, Response } from "express";
import format from "pg-format";

import { UserRequest, UserResponse } from "../../interfaces/interfaces";
import { client } from "../../database/config.database";
import AppError from "../../errors/error";

export const postUserService = async (
  payload: UserRequest
): Promise<UserResponse> => {
  const body: UserRequest = payload;

  const queryString = format(
    `
    INSERT INTO users (%I)
    VALUES (%L)
    RETURNING *;
    `,
    Object.keys(body),
    Object.values(body)
  );

  const response: UserResponse = await client.query(queryString);

  return response;
};
