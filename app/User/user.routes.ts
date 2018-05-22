import { Request, Response, Router } from "express";
import UserController from "./user.controller";
import userAuth from "./user.auth";

class UserRouter {
  public router :Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = () :void => {
    this.router.post('/', UserController.create);
    this.router.get('/', userAuth.isAdmin(), UserController.getAll);
    this.router.get('/profile', userAuth.isLoggedIn, UserController.profile);
    this.router.put('/:id', userAuth.isLoggedIn, UserController.update)
    this.router.delete('/:id', userAuth.isLoggedIn, UserController.delete)
  }
}

export default new UserRouter;