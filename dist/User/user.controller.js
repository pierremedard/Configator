"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
class UserController {
    constructor() {
        this.create = (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const user = new user_model_1.default({
                email,
                password
            });
            user.save()
                .then((data) => res.status(201).json({ data }))
                .catch((error) => res.status(500).json({ error }));
        };
        this.getAll = (req, res) => {
            user_model_1.default.find()
                .then((data) => res.status(200).json({ data }))
                .catch((error) => res.status(500).json({ error }));
        };
    }
}
exports.default = UserController;
