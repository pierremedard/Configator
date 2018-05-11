import { Request, Response, Router } from "express";
import UserController from "./user.controller";
import userAuth from "./user.auth";

class UserRouter {
  public router :Router;
  private controller : UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.routes();
  }

  private routes = () :void => {
    this.router.post('/', this.controller.create);
    this.router.get('/',
      userAuth.passport.authenticate('jwt', { session: false }),
      this.controller.getAll
    );
  }
}

export default new UserRouter;