"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_auth_1 = require("./user.auth");
class UserRouter {
    constructor() {
        this.routes = () => {
            this.router.post('/', this.controller.create);
            this.router.get('/', user_auth_1.default.passport.authenticate('jwt', { session: false }), this.controller.getAll);
        };
        this.router = express_1.Router();
        this.controller = new user_controller_1.default();
        this.routes();
    }
}
exports.default = new UserRouter;
