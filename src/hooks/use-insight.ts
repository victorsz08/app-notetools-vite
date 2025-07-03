import api from "@/lib/api";
import moment from "moment";

interface InsightsData {
  revenue: number;
  sales: number;
  completionRate: number;
}

export interface InsightStatus {
  connected: number;
  pending: number;
  cancelled: number;
}

export interface InsightPerDay {
  sales: {
    day: string;
    quantity: number;
  }[];
}

export interface TrendingRevenue {
  trending: number;
}

export interface TrendingSales {
  trending: number;
}

export interface TrendingCompletionRate {
  trending: number;
}

export interface GetTrendingInsights {
  revenue: TrendingRevenue;
  sales: TrendingSales;
  completionRate: TrendingCompletionRate;
}

interface UseInsightProps {
  getInsight: () => Promise<InsightsData>;
  getInsightStatus: () => Promise<InsightStatus>;
  getInsightPerDay: () => Promise<InsightPerDay>;
  getTrendingInsights: () => Promise<GetTrendingInsights>;
}

const dateIn = moment().startOf("month").format("YYYY-MM-DD");
const dateOut = moment().endOf("month").format("YYYY-MM-DD");

const daysPassed = moment().date();

const dateInTrending = moment(dateIn).subtract(1, "month").format("YYYY-MM-DD");

const dateOutTrending = moment(dateInTrending)
  .add(daysPassed - 1, "days")
  .format("YYYY-MM-DD");

export function useInsight(): UseInsightProps {
  const getInsight = async () => {
    const response = await api.get<InsightsData>(
      `insights?dateIn=${dateIn}&dateOut=${dateOut}`
    );
    return response.data;
  };

  const getInsightStatus = async () => {
    const response = await api.get<InsightStatus>(
      `insights/status?dateIn=${dateIn}&dateOut=${dateOut}`
    );
    return response.data;
  };

  const getInsightPerDay = async () => {
    const response = await api.get<InsightPerDay>(
      `insights/per-day?dateIn=${dateIn}&dateOut=${dateOut}`
    );
    return response.data;
  };

  const getTrendingInsights = async () => {
    const insightsPreviousMonth = await api.get(
      `insights?dateIn=${dateInTrending}&dateOut=${dateOutTrending}`
    );
    const insightsCurrentMonth = await api.get(
      `insights?dateIn=${dateIn}&dateOut=${dateOut}`
    );

    const prev = insightsPreviousMonth.data;
    const curr = insightsCurrentMonth.data;

    function calculateTrendingRate(current: number, previous: number): number {
      if (previous === 0) return current === 0 ? 0 : 100;
      return ((current - previous) / previous) * 100;
    }

    const insights: GetTrendingInsights = {
      revenue: {
        trending: calculateTrendingRate(curr.revenue, prev.revenue),
      },
      sales: {
        trending: calculateTrendingRate(curr.sales, prev.sales),
      },
      completionRate: {
        trending: calculateTrendingRate(
          curr.completionRate,
          prev.completionRate
        ),
      },
    };

    return insights;
  };

  return {
    getInsight,
    getInsightStatus,
    getInsightPerDay,
    getTrendingInsights,
  };
}
