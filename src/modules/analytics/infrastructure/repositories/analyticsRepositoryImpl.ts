import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { AnalyticsMapper } from "../../mappers/analyticsMapper";
import {
  AnalyticsResult,
  IAnalyticsRepository,
  TimeRange,
  TopMember,
  TopTeam,
  TrendingCategory,
} from "../../repositories/analyticsRepository";

interface RawTopMember {
  id: number;
  name: string;
  image_url: string;
  kudos_count: string;
}

interface RawTopTeam {
  team_name: string;
  kudos_count: string;
}

interface RawTrendingCategory {
  category: string;
  kudos_count: string;
}

export class AnalyticsRepositoryImpl implements IAnalyticsRepository {
  async getTopPerformingMembers(timeRanges: TimeRange[]): Promise<AnalyticsResult<TopMember>> {
    const result: AnalyticsResult<TopMember> = {
      currentWeek: [],
      currentMonth: [],
      currentQuarter: [],
      currentYear: [],
      allTime: [],
    };

    for (let i = 0; i < timeRanges.length; i++) {
      const timeRange = timeRanges[i];
      const query = `
        SELECT 
          u.id,
          u.name,
          u.image_url,
          COUNT(k.id) as kudos_count
        FROM users u
        LEFT JOIN kudos k ON u.id = k.user_id
        WHERE k.deleted_at IS NULL
        AND k.created_at >= $1::timestamp AT TIME ZONE 'UTC'
        AND k.created_at <= $2::timestamp AT TIME ZONE 'UTC'
        GROUP BY u.id, u.name, u.image_url
        HAVING COUNT(k.id) > 0
        ORDER BY kudos_count DESC
        LIMIT 10
      `;
      const data = await DatabaseManager.query(query, [timeRange.startDate, timeRange.endDate]);
      const key = Object.keys(result)[i];
      result[key as keyof AnalyticsResult<TopMember>] = data.map((row: RawTopMember) =>
        AnalyticsMapper.toTopMemberDto(row)
      );
    }

    return result;
  }

  async getTopPerformingTeams(timeRanges: TimeRange[]): Promise<AnalyticsResult<TopTeam>> {
    const result: AnalyticsResult<TopTeam> = {
      currentWeek: [],
      currentMonth: [],
      currentQuarter: [],
      currentYear: [],
      allTime: [],
    };

    for (let i = 0; i < timeRanges.length; i++) {
      const timeRange = timeRanges[i];
      const query = `
        SELECT 
          team_name,
          COUNT(id) as kudos_count
        FROM kudos
        WHERE deleted_at IS NULL
        AND created_at >= $1::timestamp AT TIME ZONE 'UTC'
        AND created_at <= $2::timestamp AT TIME ZONE 'UTC'
        GROUP BY team_name
        HAVING COUNT(id) > 0
        ORDER BY kudos_count DESC
        LIMIT 10
      `;
      const data = await DatabaseManager.query(query, [timeRange.startDate, timeRange.endDate]);
      const key = Object.keys(result)[i];
      result[key as keyof AnalyticsResult<TopTeam>] = data.map((row: RawTopTeam) => AnalyticsMapper.toTopTeamDto(row));
    }

    return result;
  }

  async getTrendingCategories(timeRanges: TimeRange[]): Promise<AnalyticsResult<TrendingCategory>> {
    const result: AnalyticsResult<TrendingCategory> = {
      currentWeek: [],
      currentMonth: [],
      currentQuarter: [],
      currentYear: [],
      allTime: [],
    };

    for (let i = 0; i < timeRanges.length; i++) {
      const timeRange = timeRanges[i];
      const query = `
        SELECT 
          category,
          COUNT(id) as kudos_count
        FROM kudos
        WHERE deleted_at IS NULL
        AND created_at >= $1::timestamp AT TIME ZONE 'UTC'
        AND created_at <= $2::timestamp AT TIME ZONE 'UTC'
        GROUP BY category
        HAVING COUNT(id) > 0
        ORDER BY kudos_count DESC
        LIMIT 10
      `;
      const data = await DatabaseManager.query(query, [timeRange.startDate, timeRange.endDate]);
      const key = Object.keys(result)[i];
      result[key as keyof AnalyticsResult<TrendingCategory>] = data.map((row: RawTrendingCategory) =>
        AnalyticsMapper.toTrendingCategoryDto(row)
      );
    }

    return result;
  }
}
