import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";
import moment from "moment";

interface InsightsData {
  revenue: number;
  sales: number;
  completionRate: number;
}

interface UseInsightProps {
  getInsight: () => Promise<InsightsData>;
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

  return {
    getInsight,
  };
}
