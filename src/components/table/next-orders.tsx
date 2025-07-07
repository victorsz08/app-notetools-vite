import { DataTable } from "@/components/table/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrder } from "@/hooks/user-order";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { NotFoundOrders } from "./not-found-orders";
import { DeleteGroupOrders } from "../forms/delete-group-orders";
import { CreateOrderForm } from "../forms/create-order-form";
import { useState } from "react";

export function NextOrders() {
  const { getNextOrders } = useOrder();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data, isFetching } = useQuery({
    queryKey: ["get-orders"],
    queryFn: getNextOrders,
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <Skeleton className="bg-muted w-full h-42" />;

  return (
    <Card className="w-full gap-10">
      <CardHeader className="flex items-center justify-between">
        {data && data.orders.length > 0 && (
          <div>
            <CardTitle>Próximos pedidos</CardTitle>
            <CardDescription className="text-xs">
              Pedidos com agendamentos pendentes
            </CardDescription>
          </div>
        )}
        {data && data.orders.length > 0 && (
          <div className="flex items-center gap-2">
            <DeleteGroupOrders groupId={selectedItems} />
            <CreateOrderForm />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {data && data.orders.length > 0 ? (
          <DataTable
            data={data.orders}
            selectedItems={selectedItems}
            onSelectedItemsChange={setSelectedItems}
          />
        ) : (
          <NotFoundOrders />
        )}
      </CardContent>
    </Card>
  );
}
