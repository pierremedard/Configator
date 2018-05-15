import { RequestHandler } from "express";
import { Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import passport from "../config/passport.config"
import User from "./user.model";
import { Roles, IUserModel } from "./user.interface";

class UserAuth {
  public login = (req :Request, res :Response, next :any): void => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({"token" : token})
  }

  public logout = (req :Request, res :Response): void => {
    req.logOut();
    res.status(201).send();
  }

  public isAdmin = () :Array<RequestHandler> => {
    return [
      this.isLoggedIn,
      (req, res, next) => req.user && req.user.isAdmin ? next() : res.status(401).json({message: "Not allowed"})
    ];
  }

  public checkLogin = (req, res, next) :void => passport.authenticate('login', { session: false })(req, res, next);
  public isLoggedIn = (req, res, next) :void => passport.authenticate('jwt', { session: false })(req, res, next);
}

export default new UserAuth;