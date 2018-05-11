"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user_routes_1 = require("./User/user.routes");
const user_auth_1 = require("./User/user.auth");
require('dotenv').config();
class App {
    constructor() {
        this.mountRoutes = () => {
            this.app.use('/users', user_routes_1.default.router);
            this.app.use('/login', user_auth_1.default.login);
            this.app.use('/logout', user_auth_1.default.logout);
        };
        this.config = () => {
            const MONGODB_CONNECTION = process.env.MONGODB_URI;
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: false }));
            mongoose.connect(MONGODB_CONNECTION);
        };
        this.app = express();
        this.config();
        this.mountRoutes();
    }
    static bootstrap() {
        return new App();
    }
}
exports.default = App.bootstrap().app;
