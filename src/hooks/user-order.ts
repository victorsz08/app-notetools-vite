import type { DataOrder } from "@/@types";
import api from "@/lib/api";
import moment from "moment";

interface GetOrdersOutput {
  orders: DataOrder[];
  totalItems: number;
  page: number;
  totalPages: number;
  limit: number;
}

interface UseOrderProps {
  getOrders: () => Promise<GetOrdersOutput>;
  getNextOrders: () => Promise<GetOrdersOutput>;
}

const dateIn = moment().startOf("day").format("YYY-MM-DD");
const dateOut = moment().endOf("day").format("YYY-MM-DD");

export function useOrder(): UseOrderProps {
  const getNextOrders = async () => {
    const response = await api.get<GetOrdersOutput>(
      `orders/list?page=1&limit=100&schedulingDateIn=${dateIn}&schedulingDateOut=${dateOut}`
    );

    return response.data;
  };

  const getOrders = async () => {
    const response = await api.get<GetOrdersOutput>(
      `orders/list?page=1&limit=100&schedulingDateIn=${dateIn}&schedulingDateOut=${dateOut}`
    );

    return response.data;
  };

  return {
    getOrders,
    getNextOrders,
  };
}
