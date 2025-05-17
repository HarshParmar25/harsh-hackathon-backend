import { AnalyticsResult, TopMember, TopTeam, TrendingCategory } from "../../../repositories/analyticsRepository";

export interface GetAnalyticsResponseDto {
  topPerformingMembers: AnalyticsResult<TopMember>;
  topPerformingTeams: AnalyticsResult<TopTeam>;
  trendingCategories: AnalyticsResult<TrendingCategory>;
}
