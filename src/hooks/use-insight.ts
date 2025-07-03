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

interface UseInsightProps {
  getInsight: () => Promise<InsightsData>;
  getInsightStatus: () => Promise<InsightStatus>;
  getInsightPerDay: () => Promise<InsightPerDay>;
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

    console.log(response.data);
    return response.data;
  };

  return {
    getInsight,
    getInsightStatus,
    getInsightPerDay,
  };
}
