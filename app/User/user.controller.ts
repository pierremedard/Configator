import { Request, Response, Router } from "express";
import User from "./user.model";
import { IUserModel } from "./user.interface";

class UserController {
  private secureBody = (body :any) :object => {
    delete body.__v;
    delete body._id;
    delete body.createdAt;
    delete body.isAdmin;
    delete body.points;
    return body;
  }

  public create = (req: Request, res: Response, next :Function) :void => {
    const user = new User(this.secureBody(req.body));

    user.save()
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
  }

  public getAll = (req: Request, res: Response, next :Function) :void => {
    User.find()
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
  }

  public profile = (req: Request, res: Response) => res.status(200).json(req.user);

  public update = (req :Request, res :Response, next :Function) => {
    if (req.params.id != req.user._id && !req.user.isAdmin) {
      return res.status(401).send("Unauthorized");
    }

    User.findOneAndUpdate({_id: req.params.id}, this.secureBody(req.body), {new: true})
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
  }

  public delete = function (req :Request, res :Response, next :Function) {
    if (req.params.id != req.user._id && !req.user.isAdmin) {
      return res.status(401).send("Unauthorized");
    }

    User.deleteOne({_id: req.params.id})
    .then(() => res.status(201).send())
    .catch(err => next(err));
  }
}

export default new UserController();