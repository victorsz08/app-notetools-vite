import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";
import moment from "moment";

interface InsightsData {
  revenue: number;
  sales: number;
  completionRate: number;
}

interface InsightsStatus {
  connected: number;
  pending: number;
  cancelled: number;
}

interface UseInsightProps {
  getInsight: () => Promise<InsightsData>;
  getInsightStatus: () => Promise<InsightsStatus>;
}

const dateIn = moment().startOf("month").format("YYYY-MM-DD");
const dateOut = moment().endOf("month").format("YYYY-MM-DD");

export function useInsight(userId?: string): UseInsightProps {
  const getInsight = async () => {
    const response = await api.get<InsightsData>(
      `insights/${userId}?dateIn=${dateIn}&dateOut=${dateOut}`
    );
    return response.data;
  };

  const getInsightStatus = async () => {
    const response = await api.get<InsightsStatus>(
      `insights/status/${userId}?dateIn=${dateIn}&dateOut=${dateOut}`
    );
    console.log(response.data);
    return response.data;
  };

  return {
    getInsight,
    getInsightStatus,
  };
}
