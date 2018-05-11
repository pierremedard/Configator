import { Document } from "mongoose";

export interface IUser {
  password: string;
  email: string;
  createdAt?: Date;
  comparePassword: (password :string) => boolean;
}

export interface IUserModel extends IUser, Document {
};
