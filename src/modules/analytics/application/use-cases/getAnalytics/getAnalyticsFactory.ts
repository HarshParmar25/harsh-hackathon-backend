import { AnalyticsRepositoryImpl } from "../../../infrastructure/repositories/analyticsRepositoryImpl";
import { GetAnalyticsUseCase } from "./getAnalytics";

export class GetAnalyticsFactory {
  static create() {
    const analyticsRepository = new AnalyticsRepositoryImpl();
    return new GetAnalyticsUseCase(analyticsRepository);
  }
}
