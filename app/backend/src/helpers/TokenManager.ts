import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import CreateError from './CreateError';

type jwtPayLoad = string | jwt.JwtPayload | jwt.VerifyErrors | void;
type jwtSecret = jwt.Secret | void;

const secret = process.env.JWT_SECRET || ('secret' as jwt.Secret);

interface role {
  role: string
}

interface dataJwt {
  data?: role;
  message?: string;
}

const errFunction = (err: unknown, decoded: unknown) : unknown => {
  if (err) throw new CreateError('Unauthorized', 'Token must be a valid token');
  return decoded;
};

export default class TokeManager {
  static makeToken = (payload: unknown) => {
    const jwtConfig : jwt.SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  };

  static validateToken = (token: string | undefined) => {
    const jwtSecret: jwtSecret = process.env.JWT_SECRET;
    let validToken : jwtPayLoad = '';
    if (jwtSecret && token) validToken = jwt.verify(token, jwtSecret, errFunction);
    return validToken as dataJwt;
  };
}
