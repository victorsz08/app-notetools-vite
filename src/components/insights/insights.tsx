import { useAuth } from "@/context/auth-context";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { currency, percent } from "@/lib/utils";
import { HandCoins, Handshake, Percent } from "lucide-react";

interface Insight {
  revenue: number;
  sales: number;
  completionRate: number;
}

export function Insights() {
  const { user } = useAuth();
  const userId = user?.id;

  const { data, isPending } = useQuery({
    queryKey: ["insights"],
    queryFn: async () => {
      const response = await api.get(
        `insights/${userId}?dateIn=2025-07-01&dateOut=2025-07-30`
      );
      const data: Insight = response.data;
      return data;
    },
    enabled: !!userId,
  });

  if (isPending) {
    return <p>Carregando...</p>;
  }

  return (
    <section className="flex space-x-4">
      <Card className="w-full">
        <CardHeader className="flex items-center justify-between">
          <CardDescription>Faturamento</CardDescription>
          <span className="p-2 rounded-sm bg-blue-300 text-blue-700 w-fit">
            <HandCoins className="w-4 h-4" />
          </span>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-semibold font-inter text-muted-foreground">
            {currency(data?.revenue)}
          </h1>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex items-center justify-between">
          <CardDescription>Vendas</CardDescription>
          <span className="p-2 rounded-sm bg-orange-300 text-orange-700 w-fit">
            <Handshake className="w-4 h-4" />
          </span>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-semibold font-inter text-muted-foreground">
            {data?.sales}
          </h1>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex items-center justify-between">
          <CardDescription>Percentual de instalação</CardDescription>
          <span className="p-2 rounded-sm bg-green-300 text-green-700 w-fit">
            <Percent className="w-4 h-4" />
          </span>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-semibold font-inter text-muted-foreground">
            {percent(data?.completionRate)}
          </h1>
        </CardContent>
      </Card>
    </section>
  );
}
