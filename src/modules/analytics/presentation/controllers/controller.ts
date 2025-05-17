import { NextFunction, Request, Response } from "express";
import { GetAnalyticsFactory } from "../../application/use-cases/getAnalytics/getAnalyticsFactory";

export class AnalyticsController {
  static async getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = GetAnalyticsFactory.create();
      const analytics = await useCase.execute();
      return res.status(200).json(analytics);
    } catch (error) {
      next(error);
    }
  }
}
