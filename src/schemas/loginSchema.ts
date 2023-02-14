
import { userSchema } from './userSchema';


export const loginSchema = userSchema.pick({email:true, password:true})