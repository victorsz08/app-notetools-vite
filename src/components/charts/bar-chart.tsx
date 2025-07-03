"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { useInsight } from "@/hooks/use-insight";

const chartConfig = {
  vendas: {
    label: "Vendas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface BarChartData {
  dia: string;
  quantidade: number;
}

export function BarChartSales() {
  const { getInsightPerDay } = useInsight();
  const { data, isPending } = useQuery({
    queryKey: ["sales-bar-chart"],
    queryFn: getInsightPerDay,
    initialData: {
      sales: [],
    },
  });

  const chartData: BarChartData[] = data.sales.map((sale) => ({
    dia: sale.day,
    quantidade: sale.quantity,
  }));

  if (isPending) {
    return <Skeleton className="w-full h-32 bg-muted" />;
  }

  return (
    <Card className="w-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Vendas recentes</CardTitle>
        <CardDescription className="text-xs">
          Vendas feitas nos últimos dias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dia"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="quantidade" fill="var(--color-vendas)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground/80 text-xs leading-none">
          Dia e quantidade de vendas registradas.
        </div>
      </CardFooter>
    </Card>
  );
}
