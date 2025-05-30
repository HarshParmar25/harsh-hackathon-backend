import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      session?: {
        user_id: number;
      };
    }
  }
}
