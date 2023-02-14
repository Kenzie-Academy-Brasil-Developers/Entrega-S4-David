import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express"
import { sign } from "jsonwebtoken";
import { string } from "zod";
import {User} from '../../interfaces/interfaces'

/* A middleware that checks if the email already exists in the database. */
const loginService = (payload: User): string => {
   
    const {email, id} = payload
    const token:string = sign({
        email: email,
    },
    String(process.env.SECRET_KEY),
    { expiresIn: '8h', subject: String(id) }
    )

   return token

}

export default loginService