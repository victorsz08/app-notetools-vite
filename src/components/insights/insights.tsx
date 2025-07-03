import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { currency, percent } from "@/lib/utils";
import { HandCoins, Handshake, Percent } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useInsight } from "@/hooks/use-insight";

export function Insights() {
  const { getInsight, getTrendingInsights } = useInsight();
  const { data, isPending } = useQuery({
    queryFn: getInsight,
    queryKey: ["insights"],
    initialData: {
      revenue: 0,
      sales: 0,
      completionRate: 0,
    },
  });

  const { data: trendingInsights } = useQuery({
    queryFn: getTrendingInsights,
    queryKey: ["insights-trending"],
    initialData: {
      revenue: {
        trending: 0,
      },
      sales: {
        trending: 0,
      },
      completionRate: {
        trending: 0,
      },
    },
  });

  const { revenue, completionRate, sales } = trendingInsights;
  console.log(trendingInsights);

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
        <CardContent>
          <h1 className="text-2xl font-semibold font-inter text-muted-foreground">
            {currency(data?.revenue)}
          </h1>
          <CardDescription className="text-xs text-muted-foreground/40 tracking-tighter">
            {revenue.trending > 0 ? (
              <>
                <span className="text-green-500">
                  {percent(revenue.trending)}
                </span>
                <span> de aumento</span>
              </>
            ) : (
              <>
                <span className="text-red-500">
                  {percent(revenue.trending)}
                </span>
                <span> de queda</span>
              </>
            )}
          </CardDescription>
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
          <CardDescription className="text-xs text-muted-foreground/40">
            {sales.trending > 0 ? (
              <>
                <span className="text-green-500">
                  {percent(sales.trending)}
                </span>
                <span> de aumento</span>
              </>
            ) : (
              <>
                <span className="text-red-500">{percent(sales.trending)}</span>
                <span> de queda</span>
              </>
            )}
          </CardDescription>
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
          <CardDescription className="text-xs text-muted-foreground/40">
            {completionRate.trending > 0 ? (
              <>
                <span className="text-green-500">
                  {percent(completionRate.trending)}
                </span>
                <span> de aumento</span>
              </>
            ) : (
              <>
                <span className="text-red-500">
                  {percent(completionRate.trending)}
                </span>
                <span> de queda</span>
              </>
            )}
          </CardDescription>
        </CardContent>
      </Card>
    </section>
  );
}
