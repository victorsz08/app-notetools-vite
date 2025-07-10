import { create } from "zustand";
import { type Status } from "@/@types";
import { type DateRange } from "react-day-picker";

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
  clearFilters: () => void;
}

export const useOrdersStore = create<OrdersStoreState>((set) => ({
  schedulingDateFilter: undefined,
  setSchedulingDateFilter: (date) => set({ schedulingDateFilter: date }),
  createdDateFilter: undefined,
  setCreatedDateFilter: (date) => set({ createdDateFilter: date }),
  status: undefined,
  setStatus: (status) => set({ status }),
  page: 1,
  setPage: (page) => set({ page }),
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items }),
  clearFilters: () => set({
    schedulingDateFilter: undefined,
    createdDateFilter: undefined,
    status: undefined,
    page: 1,
    selectedItems: [],
  }),
})); 