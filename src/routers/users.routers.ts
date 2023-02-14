import { Router } from "express";
import checkEmailExistenceMiddleware from "../middlewares/checkEmailExistence.middleware";
import postUserController from "../controllers/postUser.controllers";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";
import { userSchemaReq, userSchemaUpdate } from "../schemas/userSchema";
import cryptographPasswordMiddleware from "../middlewares/cryptgraphPassword.middleware";
import checkIdExistenceMiddleware from "../middlewares/checkIdExistence.middleware";
import getUserByIdController from "../controllers/getUserById.controller";
import { loginSchema } from '../schemas/loginSchema';
import loginController from '../controllers/login.controller';
import authenticateMiddleware from '../middlewares/autheticate.middlewares';
import authorizateMiddleware from '../middlewares/authorizate.middleware';
import getAllController from '../controllers/getAll.controller';
import userFromTokenMiddleware from '../middlewares/userFromToken.middleware';
import validateAdmMiddleware from '../middlewares/validateAdm.middleware';
import validatep2pPermissions from '../middlewares/validatep2pPermission.middleware';
import patchUserController from '../controllers/patchUser.controller';

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
/*usersRouter.get(
  "/:id",
  checkIdExistenceMiddleware,
  authorizateMiddleware,
  getUserByIdController
);*/

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
  loginController
);

usersRouter.patch(
  "/:id",
  authorizateMiddleware,
  checkIdExistenceMiddleware,
  validatep2pPermissions,
  checkEmailExistenceMiddleware('unique'),
  validateBodyMiddleware(userSchemaUpdate),
  cryptographPasswordMiddleware,
  patchUserController

);

usersRouter.delete(
  "/:id",
  authorizateMiddleware,
  checkIdExistenceMiddleware,
  validatep2pPermissions,
)
