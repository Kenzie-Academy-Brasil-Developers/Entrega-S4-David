import express from "express";
import { json } from "express";
import "express-async-errors";
import { usersRouter } from "./routers/users.routers";
import { uniqueErrorHandler } from "./errors/error";
import { loginRouter } from './routers/login.routers';

export const app = express();

app.use(json());
app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.use(uniqueErrorHandler);
