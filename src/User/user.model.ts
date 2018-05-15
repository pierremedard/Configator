import { Schema, model } from "mongoose";
import { IUserModel, Roles } from "./user.interface";
import * as bcrypt from "bcrypt";

let userSchema: Schema = new Schema({
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
  isAdmin: {
    type: Boolean,
    default: 'false'
  }
});

userSchema.pre<IUserModel>("save", function(next) {
  this.createdAt = this.createdAt ? this.createdAt : new Date();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(password) :boolean {
  return bcrypt.compareSync(password, this.password);
}

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    return {
      "id": ret._id,
      "email": ret.email
    }
  }
})

export default model<IUserModel>("User", userSchema);