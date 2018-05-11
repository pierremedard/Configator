"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const user_model_1 = require("../User/user.model");
let localStrategy = new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, (username, password, done) => {
    user_model_1.default.findOne({ email: username })
        .then((user) => {
        if (!user || !user.comparePassword(password)) {
            done(null, false, { message: "Invalid username/password" });
        }
        else {
            done(null, { id: user._id });
        }
    })
        .catch((err) => done(err));
});
let jwtStrategy = new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret"
}, (jwtPayload, cb) => {
    return user_model_1.default.findById(jwtPayload)
        .then(user => {
        return cb(null, user);
    })
        .catch(err => {
        return cb(err);
    });
});
this.passport.use('login', localStrategy);
this.passport.use('jwt', jwtStrategy);
