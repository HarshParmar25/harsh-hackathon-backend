import { TopMember, TopTeam, TrendingCategory } from "../repositories/analyticsRepository";

export class AnalyticsMapper {
  static toTopMemberDto(raw: any): TopMember {
    return {
      id: raw.id,
      name: raw.name,
      imageUrl: raw.image_url,
      kudosCount: parseInt(raw.kudos_count),
    };
  }

  static toTopTeamDto(raw: any): TopTeam {
    return {
      teamName: raw.team_name,
      kudosCount: parseInt(raw.kudos_count),
    };
  }

  static toTrendingCategoryDto(raw: any): TrendingCategory {
    return {
      category: raw.category,
      kudosCount: parseInt(raw.kudos_count),
    };
  }
}
