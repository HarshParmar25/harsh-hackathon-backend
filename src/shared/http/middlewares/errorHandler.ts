import { NextFunction, Request, Response } from "express";

interface ValidationError {
  value: any;
  error: {
    details: Array<{
      message: string;
      path: string[];
      type: string;
      context: {
        label: string;
        key: string;
      };
    }>;
  };
  type: string;
}

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.error?.details) {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.error.details.map((detail: ValidationError["error"]["details"][0]) => ({
        message: detail.message,
        path: detail.path,
        type: detail.type,
      })),
    });
  }

  res.status(500).json({ message: "Internal Server Error", error: err.message });
};
