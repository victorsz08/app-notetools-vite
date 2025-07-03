import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrder } from "@/hooks/user-order";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { File } from "lucide-react";

export function NextOrders() {
  const { getNextOrders } = useOrder();
  const { data, isFetching } = useQuery({
    queryKey: ["next-orders"],
    queryFn: getNextOrders,
  });

  if (isFetching) return <Skeleton className="bg-muted w-full h-42" />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Próximos pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        {data && data.orders.length > 0 ? (
          <DataTable data={data.orders} />
        ) : (
          <div className="w-full flex flex-col gap-2 items-center justify-center h-64">
            <File className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <h1 className="text-xl font-semibold text-muted-foreground">
                Opa!
              </h1>
              <small className="text-xs font-normal text-muted-foreground/70">
                Nenhum pedido com agendamento para hoje.
              </small>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
