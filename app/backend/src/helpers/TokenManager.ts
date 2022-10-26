import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

type jwtPayLoad = string | undefined | jwt.JwtPayload ;

const secret = process.env.JWT_SECRET || ('secret' as jwt.Secret);

interface role {
  role: string
}

interface dataJwt {
  data: role;
}

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
    const jwtSecret: jwtPayLoad = process.env.JWT_SECRET;
    let validToken : jwtPayLoad = '';
    if (jwtSecret && token) validToken = jwt.verify(token, jwtSecret);
    return validToken as dataJwt;
  };
}
