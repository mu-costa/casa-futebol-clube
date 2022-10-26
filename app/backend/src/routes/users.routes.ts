import { Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const usersRouter = Router();

usersRouter.get('/login', userController.login);
usersRouter.post('/login', userController.makeLogin);
usersRouter.get('/login/validate', userController.validate);

export default usersRouter;
