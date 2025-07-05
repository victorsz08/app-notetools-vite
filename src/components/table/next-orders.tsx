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

export function NextOrders() {
  const { getNextOrders } = useOrder();
  const { data, isFetching } = useQuery({
    queryKey: ["next-orders"],
    queryFn: getNextOrders,
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <Skeleton className="bg-muted w-full h-42" />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Próximos pedidos</CardTitle>
        <CardDescription className="text-xs">
          Pedidos com agendamentos pendentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.orders.length > 0 ? (
          <DataTable data={data.orders} />
        ) : (
          <NotFoundOrders/>
        )}
      </CardContent>
    </Card>
  );
}
