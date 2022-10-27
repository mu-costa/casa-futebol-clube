import { Request, Response } from 'express';
import CreateError from '../helpers/CreateError';
import TokeManager from '../helpers/TokenManager';
import UserService from '../services/UserService';

const userService = new UserService();

export default class UserController {
  public makeLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) throw new CreateError('BadRequest', 'All fields must be filled');
    const token = await userService.makeLogin({ email, password });

    return res.status(200).json({ token });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const verifyToken = TokeManager.validateToken(authorization);
    const { data } = verifyToken;
    const role = data?.role;
    res.status(200).json({ role });
  };

  public login = async (req: Request, res: Response) => {
    res.sendStatus(200).json({ status: 'ok' });
  };
}
