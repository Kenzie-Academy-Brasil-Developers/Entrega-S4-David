// src/@types/express/index.d.ts
import { User } from "../../interfaces/interfaces";

declare global {
  namespace Express {
    interface Request {
      searchedUser: User,
      token:string,
      email:string,
      loggedEmail: string,
      searchedId:number,
      id:string,
    }
  }
}
