import { Document } from "mongoose";

export const enum Roles {
  Player = 'player',
  Admin = 'admin'
}

export interface IUser {
  password: string,
  email: string,
  isAdmin: boolean,
  createdAt?: Date,
  points: number,
  comparePassword: (password :string) => boolean
}

export interface IUserModel extends IUser, Document {
};