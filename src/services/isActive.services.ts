import { NextFunction, Request, Response } from "express";
import { Active, User, UserResponse } from "../interfaces/interfaces";
import { AppError } from "../errors/error";
import  format  from 'pg-format';
import { client } from '../database/config.database';

const isActiveService = async (
  payload:string
):Promise<Active> => {
  ;
    const queryString = format(`
    SELECT active FROM users
    WHERE id=%s`, payload)

    
    const response: UserResponse = await client.query(queryString)
    
    return response.rows[0]
};

export default isActiveService;
