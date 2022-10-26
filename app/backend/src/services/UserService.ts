import bcrypt = require('bcryptjs');
import TokeManager from '../helpers/TokenManager';
import UserModel from '../database/models/SequelizeUser';
import CreateError from '../helpers/CreateError';

interface IRequest {
  email: string;
  password: string;
}

export default class userService {
  public makeLogin = async ({ email, password }: IRequest) => {
    const user = await UserModel.findOne({ where: { email } });
    let checkHash = false;

    if (user?.password) checkHash = bcrypt.compareSync(password, user?.password);

    if (!user || !checkHash) throw new CreateError('Unauthorized', 'Incorrect email or password');

    const token = TokeManager.makeToken(user);

    return token;
  };
}
