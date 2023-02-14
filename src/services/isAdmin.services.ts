import { NextFunction, Request, Response } from "express";
import { User, UserResponse } from "../interfaces/interfaces";
import { AppError } from "../errors/error";
import  format  from 'pg-format';
import { client } from '../database/config.database';

const isAdminService = async (
  payload:string
):Promise<boolean> => {
  ;
    const queryString = format(`
    SELECT admin FROM users
    WHERE email='%s'`, payload)

    const response = await client.query(queryString)
    return response.rows[0].admin
};

export default isAdminService;
