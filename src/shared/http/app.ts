import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { errorMiddleware } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import { middleware as httpContextMiddleware } from "express-http-context";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup express-http-context middleware
app.use(httpContextMiddleware);

app.use(router);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(error, req, res, next);
});

export { app };
