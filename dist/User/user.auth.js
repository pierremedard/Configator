"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const user_model_1 = require("./user.model");
require('dotenv').config();
class UserAuth {
    constructor() {
        this.passport = passport;
        this.login = (req, res, next) => {
            this.passport.authenticate('login', { session: false }, (err, user, info) => {
                if (err || !user)
                    return res.status(400).json(info);
                req.logIn(user, { session: false }, (err) => {
                    if (err)
                        return res.status(400).send(err);
                    const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "7d" });
                    res.status(200).json({ "token": token });
                });
            })(req, res, next);
        };
        this.logout = (req, res) => {
        };
        this.loadLoginStrategy = () => {
            this.passport.use('login', new passport_local_1.Strategy({
                usernameField: 'email',
                passwordField: 'password',
                session: false
            }, (username, password, done) => {
                user_model_1.default.findOne({ email: username })
                    .then((user) => {
                    if (!user || !user.comparePassword(password)) {
                        return done(null, false, { message: "Invalid username/password" });
                    }
                    done(null, { id: user._id });
                })
                    .catch((err) => done(err));
            }));
        };
        this.loadJwtStrategy = () => {
            this.passport.use('jwt', new passport_jwt_1.Strategy({
                jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET
            }, (jwtPayload, done) => {
                return user_model_1.default.findById(jwtPayload.id)
                    .then(user => done(null, user))
                    .catch(err => done(err));
            }));
        };
        this.loadLoginStrategy();
        this.loadJwtStrategy();
    }
}
exports.default = new UserAuth;
