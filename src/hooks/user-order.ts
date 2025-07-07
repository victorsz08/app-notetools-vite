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

interface UpdateSchedulingOrderInput {
  id: string;
  schedulingDate: string;
  schedulingTime: string;
}

interface UpdateStatusOrderInput {
  id: string;
  status: Status;
}

interface DeleteOrderInput {
  id: string;
}

interface UpdateInfoOrderInput {
  id: string;
  number: number;
  local: string;
  price: number;
  contact: string;
}
interface UseOrderProps {
  getOrders: (input: GetOrdersInputDto) => Promise<GetOrdersOutput>;
  getNextOrders: () => Promise<GetOrdersOutput>;
  deleteGroupOrders: (groupId?: string[]) => Promise<void>;
  updateScheduling: (input: UpdateSchedulingOrderInput) => Promise<void>;
  updateStatus: (input: UpdateStatusOrderInput) => Promise<void>;
  deleteOrder: (input: DeleteOrderInput) => Promise<void>;
  updateInfo: (input: UpdateInfoOrderInput) => Promise<void>;
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

    const response = await api.get<GetOrdersOutput>(
      `list-orders?${params.toString()}`
    );
    return response.data;
  };

  const deleteGroupOrders = async (groupId?: string[]) => {
    if (groupId && groupId.length > 0) {
      for (let i = 0; i < groupId.length; i++) {
        await api.delete(`orders/${groupId[i]}`);
      }

      return;
    }
    return;
  };

  const updateScheduling = async (input: UpdateSchedulingOrderInput) => {
    const { id, schedulingDate, schedulingTime } = input;
    await api.put(`orders/update-scheduling/${id}`, {
      schedulingDate,
      schedulingTime,
    });

    return;
  };

  const updateStatus = async (input: UpdateStatusOrderInput) => {
    const { id, status } = input;
    await api.put(`orders/update-status/${id}`, {
      status,
    });
    return;
  };

  const deleteOrder = async (input: DeleteOrderInput) => {
    const { id } = input;
    await api.delete(`orders/${id}`);
    return;
  };

  const updateInfo = async (input: UpdateInfoOrderInput) => {
    const { id, number, local, price, contact } = input;
    await api.put(`orders/${id}`, {
      number,
      local,
      price,
      contact,
    });
    return;
  };

  return {
    getOrders,
    getNextOrders,
    deleteGroupOrders,
    updateScheduling,
    updateStatus,
    deleteOrder,
    updateInfo,
  };
}
