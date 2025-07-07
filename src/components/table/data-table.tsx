import type { DataOrder, Status } from "@/@types";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import { BadgeStatus } from "../badge/badge-status";
import { currency, formatPhoneNumber } from "@/lib/utils";
import { Filter } from "lucide-react";
import moment from "moment";
import type { DateRange } from "react-day-picker";
import { DateRangeFilter } from "../filters/date-range-filter";
import { StatusFilter } from "../filters/status-filter";
import { CopyBadge } from "../badge/copy-badge";
import { Checkbox } from "../ui/checkbox";
import { MenuOrder } from "../menu/menu-order";

interface Filters {
  schedulingDateFilter?: DateRange;
  setSchedulingDateFilter?: (date?: DateRange) => void;
  createdDateFilter?: DateRange;
  setCreatedDateFilter?: (date?: DateRange) => void;
  status?: Status;
  setStatus?: (status?: Status) => void;
}
interface DataTableProps {
  data: DataOrder[];
  filters?: Filters;
  onFilters?: boolean;
  selectedItems?: string[];
  onSelectedItemsChange?: (selectedItems: string[]) => void;
}

export function DataTable({
  data,
  filters,
  onFilters,
  onSelectedItemsChange,
  selectedItems,
}: DataTableProps) {
  function handleSelectAll(checked: boolean) {
    if (checked) {
      onSelectedItemsChange?.(data.map((item) => item.id));
    } else {
      onSelectedItemsChange?.([]);
    }
  }

  function handleSelect(id: string) {
    if (selectedItems?.includes(id)) {
      onSelectedItemsChange?.(selectedItems.filter((item) => item !== id));
    } else {
      onSelectedItemsChange?.([...(selectedItems || []), id]);
    }
  }
  return (
    <section className="overflow-hidden rounded-sm border border-muted-foreground/20">
      <Table>
        <TableHeader>
          <TableRow className="pl-5">
            <TableHead>
              <Checkbox
                checked={selectedItems?.length === data.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>N° do contrato</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>
              {onFilters ? (
                <DateRangeFilter
                  date={filters?.schedulingDateFilter}
                  onChange={filters?.setSchedulingDateFilter}
                >
                  <div className="cursor-pointer gap-1 justify-start flex items-center hover:text-primary">
                    <span className={`${filters?.schedulingDateFilter ? "text-primary" : ""}`}>Data de agendamento</span>
                    <Filter className={`w-3 h-3 ${filters?.schedulingDateFilter ? "text-primary" : ""}`} />
                  </div>
                </DateRangeFilter>
              ) : (
                "Data de agendamento"
              )}
            </TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>
              {onFilters ? (
                <DateRangeFilter
                  date={filters?.createdDateFilter}
                  onChange={filters?.setCreatedDateFilter}
                >
                  <div
                    className={`cursor-pointer gap-1 justify-start flex 
                  items-center hover:text-primary`}
                  >
                    <span className={`${filters?.createdDateFilter ? "text-primary" : ""}`}>Criado</span>
                    <Filter className={`w-3 h-3 ${filters?.createdDateFilter ? "text-primary" : ""}`} />
                  </div>
                </DateRangeFilter>
              ) : (
                "Criado"
              )}
            </TableHead>
            <TableHead>
              {filters?.status ? <StatusFilter
                status={filters?.status}
                onChange={filters?.setStatus}
              >
                <div
                  className={`cursor-pointer gap-1 justify-start flex 
                  items-center hover:text-primary`}
                >
                  <span className={`${filters?.status ? "text-primary" : ""}`}>Status</span>
                  <Filter className={`w-3 h-3 ${filters?.status ? "text-primary" : ""}`} />
                </div>
              </StatusFilter> : "Status"}
            </TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="px-4">
              <TableCell>
                <Checkbox
                  checked={selectedItems?.includes(item.id)}
                  onCheckedChange={() => handleSelect(item.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-start gap-1">
                  <CopyBadge value={item.number.toLocaleString()} />
                  <span>{item.number}</span>
                </div>
              </TableCell>
              <TableCell>{item.local}</TableCell>
              <TableCell>
                {moment(item.schedulingDate).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>{item.schedulingTime}</TableCell>
              <TableCell>
                <div className="flex items-center justify-start gap-1">
                  <CopyBadge value={item.contact} />
                  <span>{formatPhoneNumber(item.contact)}</span>
                </div>
              </TableCell>
              <TableCell>
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                <BadgeStatus variant={item.status} />
              </TableCell>
              <TableCell>{currency(item.price)}</TableCell>
              <TableCell className="flex justify-center items-center">
                <MenuOrder data={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
