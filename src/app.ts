import { json } from "express";
import express from "express"
import { usersRouter } from './routers/users.routers';

export const app = express();

app.use(json())
app.use("/users", usersRouter)

