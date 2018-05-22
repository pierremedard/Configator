import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from "passport";
import * as mongoose from 'mongoose';
import userRouter from "./User/user.routes";
import userAuth from "./User/user.auth";
import * as path from "path";

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
    this.app.get('/', (req, res) => { res.sendFile(path.join(process.cwd(), 'index.html')) })
    this.app.use('/users', userRouter.router);
    this.app.post('/login', userAuth.checkLogin, userAuth.login);
    this.app.post('/logout', userAuth.logout);
  }

  private config = (): void => {
    const MONGODB_CONNECTION: string = process.env.MONGODB_URI;

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/static', express.static(path.join(process.cwd(), 'static')));
    mongoose.connect(MONGODB_CONNECTION);
  }
}

export default App.bootstrap().app;