import { Status } from "@/@types";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface OrdersStoreState {
  schedulingDateFilter?: DateRange;
  setSchedulingDateFilter: (date?: DateRange) => void;
  createdDateFilter?: DateRange;
  setCreatedDateFilter: (date?: DateRange) => void;
  status?: Status;
  setStatus: (status?: Status) => void;
  page: number;
  setPage: (page: number) => void;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

export const useOrdersStore = create<OrdersStoreState>((set) => ({
  schedulingDateFilter: undefined,
  setSchedulingDateFilter: (date) => set({ schedulingDateFilter: date, page: 1 }),
  createdDateFilter: undefined,
  setCreatedDateFilter: (date) => set({ createdDateFilter: date, page: 1 }),
  status: undefined,
  setStatus: (status) => set({ status, page: 1 }),
  page: 1,
  setPage: (page) => set({ page }),
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items }),
}));
