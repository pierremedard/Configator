import { Router } from "express";

class HardwareRouter {
  public router :Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = () => {
  }
}