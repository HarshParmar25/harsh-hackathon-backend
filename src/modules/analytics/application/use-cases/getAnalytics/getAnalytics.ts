import {
  AnalyticsResult,
  IAnalyticsRepository,
  TimeRange,
  TopMember,
  TopTeam,
  TrendingCategory,
} from "../../../repositories/analyticsRepository";
import { GetAnalyticsResponseDto } from "./getAnalyticsDto";

export class GetAnalyticsUseCase {
  constructor(private readonly analyticsRepository: IAnalyticsRepository) {}

  private getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  private getStartOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private getStartOfQuarter(date: Date): Date {
    const quarter = Math.floor(date.getMonth() / 3);
    return new Date(date.getFullYear(), quarter * 3, 1);
  }

  private getStartOfYear(date: Date): Date {
    return new Date(date.getFullYear(), 0, 1);
  }

  private getTimeRanges(): TimeRange[] {
    const now = new Date();
    const startOfWeek = this.getStartOfWeek(now);
    const startOfMonth = this.getStartOfMonth(now);
    const startOfQuarter = this.getStartOfQuarter(now);
    const startOfYear = this.getStartOfYear(now);
    const beginningOfTime = new Date(0);

    return [
      {
        startDate: startOfWeek,
        endDate: now,
        label: "Current Week",
        value: "currentWeek",
      },
      {
        startDate: startOfMonth,
        endDate: now,
        label: "Current Month",
        value: "currentMonth",
      },
      {
        startDate: startOfQuarter,
        endDate: now,
        label: "Current Quarter",
        value: "currentQuarter",
      },
      {
        startDate: startOfYear,
        endDate: now,
        label: "Current Year",
        value: "currentYear",
      },
      {
        startDate: beginningOfTime,
        endDate: now,
        label: "All Time",
        value: "allTime",
      },
    ];
  }

  async execute(): Promise<GetAnalyticsResponseDto> {
    const timeRanges = this.getTimeRanges();

    const [topMembers, topTeams, trendingCategories] = await Promise.all([
      this.analyticsRepository.getTopPerformingMembers(timeRanges),
      this.analyticsRepository.getTopPerformingTeams(timeRanges),
      this.analyticsRepository.getTrendingCategories(timeRanges),
    ]);

    return {
      topPerformingMembers: topMembers,
      topPerformingTeams: topTeams,
      trendingCategories: trendingCategories,
    };
  }
}
