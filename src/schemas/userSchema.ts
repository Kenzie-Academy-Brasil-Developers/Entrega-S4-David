import { boolean, z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(20),
  email: z.string().max(100),
  password: z.string().max(120),
  admin: boolean().optional(),
  active: boolean(),
});

export const userSchemaReq = userSchema.omit({ id: true});

export const userSchemaUpdate = userSchemaReq
  .omit({admin:true})
  .partial()
  .refine(({ name, email, password }) => name || email || password,
  {message:'must enter at least one of name, email of password to be updated'});
