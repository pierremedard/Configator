import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from "passport";
import mongoose = require('mongoose');
import userRouter from "./User/user.routes";
import userAuth from "./User/user.auth";

require('dotenv').config();

class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor () {
    this.app = express();
    this.config();
    this.mountRoutes();
  }

  private mountRoutes = (): void => {
    this.app.use('/users', userRouter.router);
    this.app.post('/login', userAuth.checkLogin, userAuth.login);
    this.app.post('/logout', userAuth.logout);
  }

  private config = (): void => {
    const MONGODB_CONNECTION: string = process.env.MONGODB_URI;

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    mongoose.connect(MONGODB_CONNECTION);
  }
}

export default App.bootstrap().app;