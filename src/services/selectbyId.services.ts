import { NextFunction, query, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database/config.database";
import { User, UserResponse } from "../interfaces/interfaces";
import { AppError } from "../errors/error";

/* A middleware that checks if the id already exists in the database. */
const selectbyIdService = async (payload: string): Promise<User> => {
  const id = payload;
  const queryString = format(
    `
        SELECT * FROM users
        WHERE id=%s;
        `,
    id
  );

  console.log(queryString)
  const response: UserResponse = await client.query(queryString);
  return response.rows[0];
};

export default selectbyIdService;
