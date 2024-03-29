import { NextFunction, Request, Response } from "express";
import { Admin, User, UserResponse, UserUpdate } from "../interfaces/interfaces";
import { AppError } from "../errors/error";
import  format  from 'pg-format';
import { client } from '../database/config.database';

const isAdminService = async (
  payload:string
):Promise<Admin> => {
  ;
    const queryString = format(`
    SELECT admin FROM users
    WHERE email='%s'`, payload)

    const response: UserResponse = await client.query(queryString)
    return response.rows[0]
};

export default isAdminService;
