import { NextFunction, Request, Response } from "express";

export class UserController {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: "User fetched successfully" });
  }
}
