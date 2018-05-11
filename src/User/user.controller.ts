import { Request, Response, Router } from "express";
import User from "./user.model";

class UserController {

  public create = (req: Request, res: Response) :void => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = new User({
      email,
      password
    });
    user.save()
    .then((data) => res.status(201).json({data}))
    .catch((error) => res.status(500).json({error}));
  }

  public getAll = (req: Request, res: Response) :void => {
    User.find()
    .then((data) => res.status(200).json({ data }))
    .catch((error) => res.status(500).json({ error }));
  }
}

export default UserController;