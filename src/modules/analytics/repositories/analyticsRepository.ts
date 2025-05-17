import { KudosWithUsers } from "../../kudos/repositories/kudosRepository";

export interface TimeRange {
  startDate: Date;
  endDate: Date;
  label: string;
  value: string;
}

export interface TopMember {
  id: number;
  name: string;
  imageUrl: string;
  kudosCount: number;
}

export interface TopTeam {
  teamName: string;
  kudosCount: number;
}

export interface TrendingCategory {
  category: string;
  kudosCount: number;
}

export interface AnalyticsResult<T> {
  currentWeek: T[];
  currentMonth: T[];
  currentQuarter: T[];
  currentYear: T[];
  allTime: T[];
}

export interface IAnalyticsRepository {
  getTopPerformingMembers(timeRanges: TimeRange[]): Promise<AnalyticsResult<TopMember>>;
  getTopPerformingTeams(timeRanges: TimeRange[]): Promise<AnalyticsResult<TopTeam>>;
  getTrendingCategories(timeRanges: TimeRange[]): Promise<AnalyticsResult<TrendingCategory>>;
}
