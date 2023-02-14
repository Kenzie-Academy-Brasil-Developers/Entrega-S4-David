import { QueryResult } from "pg";
import { boolean, z } from "zod";
import { userSchema } from '../schemas/userSchema';
export type User = z.infer<typeof userSchema>

export type UserRequest = Omit<User,"id">
export type UserLogin = Pick<User,"email"|"password" >
export type UserResponse = QueryResult<User>
export type UserSanitized = Partial<User>
export type UserUpdate = Partial<User>
