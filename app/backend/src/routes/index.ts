import { Application } from 'express-serve-static-core';
import usersRouter from './users.routes';

export default (app : Application) => {
  app.use(usersRouter);
};
