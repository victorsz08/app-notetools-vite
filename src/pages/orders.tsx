import { type Status } from "@/@types";
import { CreateOrderForm } from "@/components/forms/create-order-form";
import { DataTable } from "@/components/table/data-table";
import { NotFoundOrders } from "@/components/table/not-found-orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrder } from "@/hooks/user-order";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

export function OrdersPage() {
  const { getOrders } = useOrder();
  const [schedulingDateFilter, setSchedulingDateFilter] = useState<
    DateRange | undefined
  >();
  const [createdDateFilter, setCreatedDateFilter] = useState<
    DateRange | undefined
  >();
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<Status | undefined>();

  const { data, isFetching } = useQuery({
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
      schedulingDateFilter,
      createdDateFilter,
      status,
      page,
    ],
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return (
      <section className="p-4">
        <Skeleton className="w-full h-screen bg-muted" />
      </section>
    );
  }

  return (
    <section className="p-4 space-y-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-muted-foreground">
          Meus pedidos
        </h1>
        <small className="text-xs text-light text-muted-foreground/80">
          Gerencie seus pedidos, crie ou atualize-os .
        </small>
      </div>
      <Card>
        <CardHeader className="flex items-center justify-end">
          <CreateOrderForm />
        </CardHeader>
        <CardContent>
          {data ? (
            <DataTable
              data={data.orders}
              onFilters
              filters={{
                schedulingDateFilter,
                setCreatedDateFilter,
                createdDateFilter,
                setSchedulingDateFilter,
                status,
                setStatus
              }}
            />
          ) : (
            <NotFoundOrders />
          )}
        </CardContent>
        {data && (
          <CardFooter>
            <div className="flex items-center w-full justify-between">
              <span className="text-xs text-muted-foreground">
                Total de {data?.totalItems} encontrados
              </span>

              <div className="flex items-center gap-3">
                <Button type="button" variant="secondary" onClick={() => setPage(1)} disabled={page === 1}>
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button type="button" variant="secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= data.totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setPage(data.totalPages)}
                  disabled={page >= data.totalPages}
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">
                Página {page} de {data?.totalPages}
              </span>
            </div>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
