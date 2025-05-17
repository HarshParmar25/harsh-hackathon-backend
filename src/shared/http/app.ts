import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { errorMiddleware } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import { middleware as httpContextMiddleware } from "express-http-context";
import logger from "morgan";

const app = express();

app.use(
  cors({
    origin: true, // This will reflect the request origin
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup express-http-context middleware
app.use(httpContextMiddleware);

app.use(
  logger(function (tokens, req, res) {
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

app.use(router);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(error, req, res, next);
});

export { app };
