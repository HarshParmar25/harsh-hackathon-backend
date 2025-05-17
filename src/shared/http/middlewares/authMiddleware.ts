import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../modules/users/application/services/authService";
import { SessionRepositoryImpl } from "../../../modules/users/infrastructure/repositories/sessionRepositoryImpl";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.session_token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const sessionRepository = new SessionRepositoryImpl();
    const authService = new AuthService(sessionRepository);
    const session = await authService.validateSession(token);

    if (!session) {
      return res.status(401).json({ message: "Invalid or expired session" });
    }

    req.session = {
      user_id: session.getUserId(),
    };
    next();
  } catch (error) {
    next(error);
  }
};
