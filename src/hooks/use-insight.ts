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

export interface InsightTrending {
  sales: { previous: number; last: number; trend: number };
  revenue: { previous: number; last: number; trend: number };
  completionRate: { previous: number; last: number; trend: number };
}

export interface InsightPerDay {
  sales: {
    day: string;
    quantity: number;
  }[];
}

interface UseInsightProps {
  getInsight: () => Promise<InsightsData>;
  getInsightStatus: () => Promise<InsightStatus>;
  getInsightPerDay: () => Promise<InsightPerDay>;
  getInsightTrending: () => Promise<InsightTrending>;
}

const dateIn = moment().startOf("month").format("YYYY-MM-DD");
const dateOut = moment().endOf("month").format("YYYY-MM-DD");

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

  const getInsightTrending = async () => {
    const response = await api.get<InsightTrending>(`insights/trending`);
    console.log(response.data); 
    return response.data;
  };

  return {
    getInsight,
    getInsightStatus,
    getInsightPerDay,
    getInsightTrending,
  };
}
