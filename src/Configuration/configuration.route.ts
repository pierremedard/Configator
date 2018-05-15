import { Router } from "express";

class ConfigurationRounter {
  public router :Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = () => {
  }
}