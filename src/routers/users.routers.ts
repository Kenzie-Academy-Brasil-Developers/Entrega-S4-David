import { Router } from "express";
import checkEmailExistenceMiddleware from "../middlewares/checkEmailExistence.middleware";
import postUserController from "../controllers/postUser.controllers";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";
import { userSchemaReq, userSchemaUpdate } from "../schemas/userSchema";
import cryptographPasswordMiddleware from "../middlewares/cryptgraphPassword.middleware";
import checkIdExistenceMiddleware from "../middlewares/checkIdExistence.middleware";
import getUserByIdController from "../controllers/getUserById.controller";
import { loginSchema } from "../schemas/loginSchema";
import loginController from "../controllers/login.controller";
import authenticateMiddleware from "../middlewares/autheticate.middlewares";
import authorizateMiddleware from "../middlewares/authorizate.middleware";
import getAllController from "../controllers/getAll.controller";
import userFromTokenMiddleware from "../middlewares/userFromToken.middleware";
import validateAdmMiddleware from "../middlewares/validateAdm.middleware";
import validateEditPermissions from "../middlewares/validateEditPermission.middleware";
import patchUserController from "../controllers/patchUser.controller";
import deactivateUserController from "../controllers/deactivateUser.controller";
import validateActiveMiddleware from "../middlewares/validateActive.middleware";
import activateUserController from "../controllers/activateUser.controller";

export const usersRouter: Router = Router();
usersRouter.post(
  "/",
  validateBodyMiddleware(userSchemaReq),
  checkEmailExistenceMiddleware("unique"),
  cryptographPasswordMiddleware,
  postUserController
);

usersRouter.get(
  "/",
  authorizateMiddleware,
  userFromTokenMiddleware,
  validateAdmMiddleware,
  getAllController
);

usersRouter.get(
  "/profile",
  authorizateMiddleware,
  userFromTokenMiddleware,
  getUserByIdController
);

usersRouter.post(
  "/login",
  validateBodyMiddleware(loginSchema),
  checkEmailExistenceMiddleware("existsLogin"),
  authenticateMiddleware,
  validateActiveMiddleware("active", "middleware"),
  loginController
);

usersRouter.patch(
  "/:id",
  checkIdExistenceMiddleware,
  authorizateMiddleware,
  validateEditPermissions,
  checkEmailExistenceMiddleware("unique"),
  validateBodyMiddleware(userSchemaUpdate),
  cryptographPasswordMiddleware,
  patchUserController
);

usersRouter.delete(
  "/:id",
  checkIdExistenceMiddleware,
  authorizateMiddleware,
  validateEditPermissions,
  validateActiveMiddleware("active", "req"),
  deactivateUserController
);

usersRouter.put(
  "/:id/recover",
  checkIdExistenceMiddleware,
  validateActiveMiddleware("inactive", "req"),
  authorizateMiddleware,
  userFromTokenMiddleware,
  validateAdmMiddleware,
  activateUserController
);
