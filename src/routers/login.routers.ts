import { Router } from "express";
import checkEmailExistenceMiddleware from "../middlewares/checkEmailExistence.middleware";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";
import { loginSchema } from "../schemas/loginSchema";
import loginController from "../controllers/login.controller";
import authenticateMiddleware from "../middlewares/autheticate.middlewares";
import validateActiveMiddleware from "../middlewares/validateActive.middleware";
import activateUserController from "../controllers/activateUser.controller";

export const loginRouter: Router = Router();

loginRouter.post(
  "/",
  validateBodyMiddleware(loginSchema),
  checkEmailExistenceMiddleware("existsLogin"),
  authenticateMiddleware,
  validateActiveMiddleware("active", "middleware"),
  loginController
);




