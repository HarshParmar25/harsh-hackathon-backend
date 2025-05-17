import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { errorMiddleware } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import { middleware as httpContextMiddleware } from "express-http-context";
import logger from "morgan";

export class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(httpContextMiddleware);
    this.app.use(
      logger((tokens, req, res) => {
        try {
          return [
            `[${req.headers["x-forwarded-for"]}]` || `[${req.ip}]`,
            `[${tokens.date(req, res, "clf")}]`,
            `["${tokens.method(req, res)}`,
            `${req.protocol}://${req.hostname}${tokens.url(req, res)}`,
            `HTTP/:${tokens["http-version"](req, res)}"]`,
            `[${tokens.status(req, res)}]`,
            `[${tokens.res(req, res, "content-length")}]`,
            "-",
            `[${tokens["response-time"](req, res)}]`,
            "ms",
            `[${tokens["user-agent"](req, res)}]`,
            `[${req.headers["x-rev-req-id"]}]`,
            `[${req.headers["referer"]}]`,
          ].join(" ");
        } catch (error) {
          return "Error while writing access log from logger middleware";
        }
      })
    );
  }

  private configureRoutes(): void {
    this.app.use(router);
  }

  private configureErrorHandling(): void {
    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      errorMiddleware(error, req, res, next);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

export const app = new App().getApp();
