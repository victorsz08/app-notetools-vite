"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { useInsight, type InsightStatus } from "@/hooks/use-insight";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

interface ChartDataProps {
  status: string;
  quantidade: number;
  fill: string;
}

const chartConfig = {
  vendas: {
    label: "Vendas",
  },
  conectados: {
    label: "Conectados",
    color: "var(--chart-1)",
  },
  pendentes: {
    label: "Pendentes",
    color: "var(--chart-2)",
  },
  cancelados: {
    label: "Cancelados",
    color: "var(--chart-3)",
  },
} as ChartConfig;

export function ChartPieDonut() {
  const { getInsightStatus } = useInsight();
  const { data, isPending } = useQuery({
    queryFn: getInsightStatus,
    queryKey: ["insights-status"],
    initialData: {} as InsightStatus,
  });

  const chartData: ChartDataProps[] = [
    {
      status: "conectados",
      quantidade: data.connected,
      fill: "var(--color-conectados)",
    },
    {
      status: "pendentes",
      quantidade: data.pending,
      fill: "var(--color-pendentes)",
    },
    {
      status: "cancelados",
      quantidade: data.cancelled,
      fill: "var(--color-cancelados)",
    },
  ];

  const totalSales = React.useMemo(() => {
    return chartData.reduce((acc, item) => acc + item.quantidade, 0);
  }, [data]);

  if (isPending) {
    return <Skeleton className="w-[220px] h-[240px] bg-muted" />;
  }

  return (
    <Card className="flex text-center flex-col w-[420px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status dos pedidos</CardTitle>
        <CardDescription className="text-xs">
          Mostrandos vendas efetuadas no mês
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto relative aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantidade"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label className="text-3xl font-bold text-muted-foreground">
                {totalSales.toLocaleString()}
              </Label>
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center">
        <div className="flex items-center justify-center space-x-3">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <span
                  style={{ backgroundColor: chartConfig[item.status].color }}
                  className="w-3 h-3 rounded-sm"
                ></span>
                <span className="text-foreground font-inter font-semibold text-sm">
                  {item.quantidade}
                </span>
              </div>
              <span className="text-xs font-light text-muted-foreground/80">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
