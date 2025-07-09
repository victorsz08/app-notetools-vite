import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { currency, percent } from "@/lib/utils";
import { HandCoins, Handshake, Percent } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useInsight } from "@/hooks/use-insight";
import { Badge } from "../ui/badge";
import { BadgeTrending } from "../badge/badge-trending";

export function Insights() {
  const { getInsight, getInsightTrending } = useInsight();

  const { data, isPending } = useQuery({
    queryFn: getInsight,
    queryKey: ["insights"],
    initialData: {
      revenue: 0,
      sales: 0,
      completionRate: 0,
    },
  });

  const { data: trending, isPending: isPendingTrending } = useQuery({
    queryFn: getInsightTrending,
    queryKey: ["insights-trending"],
    initialData: {
      sales: { previous: 0, last: 0, trend: 0 },
      revenue: { previous: 0, last: 0, trend: 0 },
      completionRate: { previous: 0, last: 0, trend: 0 },
    },
  });

  if (isPending) {
    return (
      <section className="flex space-x-4">
        <Skeleton className="w-full h-32 bg-muted" />
        <Skeleton className="w-full h-32 bg-muted" />
        <Skeleton className="w-full h-32 bg-muted" />
      </section>
    );
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
        <CardContent className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold font-inter text-muted-foreground">
            {currency(data?.revenue)}
          </h1>
          <BadgeTrending variant={trending.revenue.trend > 0 ? "up" : "down"}>
            {percent(trending.revenue.trend)}
          </BadgeTrending>
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
          <BadgeTrending variant={trending.sales.trend > 0 ? "up" : "down"}>
            {percent(trending.sales.trend)}
          </BadgeTrending>
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
          <BadgeTrending
            variant={trending.completionRate.trend > 0 ? "up" : "down"}
          >
            {percent(trending.completionRate.trend)}
          </BadgeTrending>
        </CardContent>
      </Card>
    </section>
  );
}
