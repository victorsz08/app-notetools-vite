import { BadgeFilters } from "@/components/badge/badge-filters";
import { DataTableOrders } from "@/features/Order/components/data-table-orders";
import { useOrdersStore } from "@/store/orders-store";
import {
  Calendar,
  CircleDollarSign,
} from "lucide-react";
import { useEffect } from "react";

export function OrdersPage() {
  // Zustand store hooks - apenas para leitura dos filtros
  const schedulingDateFilter = useOrdersStore((s) => s.schedulingDateFilter);
  const createdDateFilter = useOrdersStore((s) => s.createdDateFilter);
  const status = useOrdersStore((s) => s.status);
  const clearFilters = useOrdersStore((s) => s.clearFilters);

  // Limpar filtros ao sair da página
  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, [clearFilters]);

  return (
    <section className="p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-muted-foreground">
          Meus pedidos
        </h1>
        <small className="text-xs text-light text-muted-foreground/80">
          Gerencie seus pedidos, crie ou atualize-os.
        </small>
      </div>

      {/* Filtros ativos */}
      {(schedulingDateFilter || createdDateFilter || status) && (
        <div className="flex items-center gap-2 flex-wrap">
          {schedulingDateFilter && (
            <BadgeFilters>
              <Calendar className="w-3 h-3 text-muted-foreground/80" />
              <span>Filtro de data de agendamento: </span>
              {schedulingDateFilter.from?.toLocaleDateString()} -{" "}
              {schedulingDateFilter.to?.toLocaleDateString()}
            </BadgeFilters>
          )}
          {createdDateFilter && (
            <BadgeFilters>
              <Calendar className="w-3 h-3 text-muted-foreground/80" />
              <span>Filtro de data de criação: </span>
              {createdDateFilter.from?.toLocaleDateString()} -{" "}
              {createdDateFilter.to?.toLocaleDateString()}
            </BadgeFilters>
          )}
          {status && (
            <BadgeFilters>
              <CircleDollarSign className="w-3 h-3 text-muted-foreground/80" />
              <span>Filtro de status: </span>
              {status.toLowerCase()}
            </BadgeFilters>
          )}
        </div>
      )}

      {/* Tabela de dados */}
      <DataTableOrders />
    </section>
  );
}
