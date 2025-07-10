import { useOrder } from "@/hooks/user-order";
import { useQuery } from "@tanstack/react-query";
import { useOrdersStore } from "../hooks/use-orders";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/table/data-table";
import { DeleteGroupOrders } from "@/components/forms/delete-group-orders";
import { CreateOrderForm } from "@/components/forms/create-order-form";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeFilters } from "@/components/badge/badge-filters";
import { Calendar,  Tag, XCircle } from "lucide-react";
import { NotFoundOrders } from "@/components/table/not-found-orders";

export function DataTableOrders() {
  const { getOrders } = useOrder();
  const {
    page,
    setPage,
    schedulingDateFilter,
    createdDateFilter,
    status,
    setSchedulingDateFilter,
    setCreatedDateFilter,
    setStatus,
    selectedItems,
    setSelectedItems,
  } = useOrdersStore();

  const { data, isFetching, error } = useQuery({
    queryFn: () =>
      getOrders({
        page: page,
        limit: 10,
        schedulingDateIn: schedulingDateFilter?.from?.toDateString(),
        schedulingDateOut: schedulingDateFilter?.to?.toDateString(),
        createdDateIn: createdDateFilter?.from?.toDateString(),
        createdDateOut: createdDateFilter?.to?.toDateString(),
        status: status,
      }),
    queryKey: [
      "get-orders",
      page,
      schedulingDateFilter?.from?.toDateString(),
      schedulingDateFilter?.to?.toDateString(),
      createdDateFilter?.from?.toDateString(),
      createdDateFilter?.to?.toDateString(),
      status,
    ],
    refetchOnWindowFocus: false,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000, 
  });

  // Loading state
  if (isFetching) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-end gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-96" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">
            Erro ao carregar os pedidos. Tente novamente.
          </p>
        </CardContent>
      </Card>
    );
  }

  // No data state
  if (!data || data.orders.length === 0) {
    return (
      <NotFoundOrders/>
    );
  }

  return (
    <Card>
      {/* Header com ações */}
      <CardHeader className="flex items-center justify-end w-full">
            {selectedItems.length > 0 && (
              <DeleteGroupOrders groupId={selectedItems} />
            )}
            <CreateOrderForm />
      </CardHeader>

      {/* Conteúdo da tabela */}
      <CardContent>
        {/* Indicadores de filtros ativos */}
        {(schedulingDateFilter || createdDateFilter || status) && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {schedulingDateFilter && (
              <BadgeFilters>
                <Calendar className="w-3 h-3 text-muted-foreground/80" />
                <span>Agendamento: </span>
                {schedulingDateFilter.from?.toLocaleDateString()} -{" "}
                {schedulingDateFilter.to?.toLocaleDateString()}
                <XCircle className="w-3 h-3 cursor-pointer" onClick={() => setSchedulingDateFilter(undefined)}/>
              </BadgeFilters>
            )}
            {createdDateFilter && (
              <BadgeFilters>
                <Calendar className="w-3 h-3 text-muted-foreground/80" />
                <span>Criação: </span>
                {createdDateFilter.from?.toLocaleDateString()} -{" "}
                {createdDateFilter.to?.toLocaleDateString()}
                <XCircle className="w-3 h-3 cursor-pointer" onClick={() => setCreatedDateFilter(undefined)}/>
              </BadgeFilters>
            )}
            {status && (
              <BadgeFilters>
                <Tag className="w-3 h-3 text-muted-foreground/80" />
                <span>Status: </span>
                {status.toLowerCase()}
                <XCircle className="w-3 h-3 cursor-pointer" onClick={() => setStatus(undefined)}/>
              </BadgeFilters>
            )}
          </div>
        )}

        {/* Tabela de dados */}
        <DataTable
          data={data.orders}
          onFilters
          filters={{
            schedulingDateFilter: schedulingDateFilter,
            setSchedulingDateFilter: setSchedulingDateFilter,
            createdDateFilter: createdDateFilter,
            setCreatedDateFilter: setCreatedDateFilter,
            status: status,
            setStatus: setStatus,
          }}
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
        />
      </CardContent>

      {/* Paginação */}
      <CardFooter>
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          totalItems={data.totalItems}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
