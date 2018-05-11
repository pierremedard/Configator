import { Request, Response, Router } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import User from "./user.model";

require('dotenv').config();

class UserAuth {
  public passport = passport;

  constructor () {
    this.loadLoginStrategy();
    this.loadJwtStrategy();
  }

  public login = (req :Request, res :Response, next :any): void => {
    this.passport.authenticate('login', {session: false}, (err, user, info) => {
      if (err || !user) return res.status(400).json(info);

      req.logIn(user, {session: false}, (err) => {
        if (err) return res.status(400).send(err);

        const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({"token" : token})
      })
    })(req, res, next);
  }

  public logout = (req :Request, res :Response): void => {
  }

  private loadLoginStrategy = () :void => {
    this.passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, (username, password, done) => {
      User.findOne({ email: username})
      .then((user) => {
        if (!user || !user.comparePassword(password)) {
          return done(null, false, { message: "Invalid username/password" });
        }
        done(null, {id: user._id});
      })
      .catch((err) => done(err));
    }));
  }

  private loadJwtStrategy = () :void => {
    this.passport.use('jwt', new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, done) => {
      return User.findById(jwtPayload.id)
      .then(user =>  done(null, user))
      .catch(err => done(err))
    }));
  }
}

export default new UserAuth;