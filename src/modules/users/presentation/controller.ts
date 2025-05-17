import { NextFunction, Request, Response } from "express";
import { SignupFactory } from "../application/useCases/signup/signupFactory";
import { LoginFactory } from "../application/useCases/login/loginFactory";
import { LoginDTO } from "../application/useCases/login/loginDto";
import { LogoutFactory } from "../application/useCases/logout/logout.factory";
import { GetAllUsersFactory } from "../application/useCases/getAllUsers/getAllUsersFactory";

export class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = SignupFactory.create();
      const result = await useCase.execute(req.body);

      res.cookie("session_token", result.session.token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: true,
      });

      return res.status(201).json(result.user);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.session_token;
      if (!token) {
        return res.status(200).json({ message: "Already logged out" });
      }

      const useCase = LogoutFactory.create();
      await useCase.execute(token);

      res.clearCookie("session_token");

      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: LoginDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const useCase = LoginFactory.create();

      const result = await useCase.execute(dto);

      res.cookie("session_token", result.session.token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: true,
      });

      return res.status(200).json(result.user);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = GetAllUsersFactory.create();
      const users = await useCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}
