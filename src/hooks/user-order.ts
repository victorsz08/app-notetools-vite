import type { DataOrder, Status } from "@/@types";
import api from "@/lib/api";
import moment from "moment";

interface GetOrdersOutput {
  orders: DataOrder[];
  totalItems: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface GetOrdersInputDto {
  page: number;
  limit: number;
  schedulingDateIn?: string;
  schedulingDateOut?: string;
  createdDateIn?: string;
  createdDateOut?: string;
  status?: Status;
}
interface UseOrderProps {
  getOrders: (input: GetOrdersInputDto) => Promise<GetOrdersOutput>;
  getNextOrders: () => Promise<GetOrdersOutput>;
}

const dateIn = moment().format("YYYY-MM-DD");
const dateOut = moment().format("YYYY-MM-DD");

export function useOrder(): UseOrderProps {
  const getNextOrders = async () => {
    const response = await api.get<GetOrdersOutput>(
      `list-orders?page=1&limit=100&schedulingDateIn=${dateIn}&schedulingDateOut=${dateOut}`
    );

    return response.data;
  };

  const getOrders = async (input: GetOrdersInputDto) => {
    const {
      page,
      limit,
      schedulingDateIn,
      schedulingDateOut,
      createdDateIn,
      createdDateOut,
      status,
    } = input;

    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (status) {
      params.append("status", status);
    }

    if (schedulingDateIn && schedulingDateOut) {
      params.append("schedulingDateIn", schedulingDateIn);
      params.append("schedulingDateOut", schedulingDateOut);
    }

    if (createdDateIn && createdDateOut) {
      params.append("createdDateIn", createdDateIn);
      params.append("createdDateOut", createdDateOut);
    }

    const response = await api.get<GetOrdersOutput>(`list-orders?${params.toString()}`);
    return response.data;
  };
  return {
    getOrders,
    getNextOrders,
  };
}
