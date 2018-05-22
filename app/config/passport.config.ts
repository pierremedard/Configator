import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as passport from "passport";
import User from "../User/user.model";
import { IUserModel } from "../User/user.interface";
import * as path from "path";

require('dotenv').config();

const LoginStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (username, password, done) => {
  User.findOne({ email: username})
  .then(user => {
    if (!user || !user.comparePassword(password)) {
      return done(null, false, { message: "Invalid username/password" });
    }

    done(null, user.toObject());
  })
  .catch(err => done(err));
});

const TokenStrategy = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, (jwtPayload, done) => {
  return User.findById(jwtPayload.user._id)
    .then(user => {

      done(null, user)
    })
    .catch(err => done(err))
})

passport.use('login', LoginStrategy);
passport.use('jwt', TokenStrategy);

export default passport;