"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
let userSchema = new mongoose_1.Schema({
    createdAt: Date,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
userSchema.pre("save", function (next) {
    this.createdAt = this.createdAt ? this.createdAt : new Date();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
userSchema.methods.comparePassword = function (password) {
    return (bcrypt.compareSync(password, this.password));
};
exports.default = mongoose_1.model("User", userSchema);
