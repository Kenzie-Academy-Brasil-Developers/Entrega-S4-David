import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database/config.database";
import { User, UserResponse } from "../interfaces/interfaces";
import { AppError } from "../errors/error";

/* A middleware that checks if the email already exists in the database. */
const selectbyEmailService = async (payload: string): Promise<User> => {
  const email = payload;


  const queryString = format(
    `
        SELECT * FROM users
        WHERE email='%s';
        `,
    email
  );


  const response: UserResponse = await client.query(queryString);
 
  return response.rows[0];
};

export default selectbyEmailService;
