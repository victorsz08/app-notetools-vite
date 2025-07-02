"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
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
import moment from "moment";
import { useAuth } from "@/context/auth-context";
import { useInsight, type InsightStatus } from "@/hooks/use-insight";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import api from "@/lib/api";

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
    color: "var(--chart-3)",
  },
  pendentes: {
    label: "Pendentes",
    color: "var(--chart-2)",
  },
  cancelados: {
    label: "Cancelados",
    color: "var(--chart-4)",
  },
} as ChartConfig;

const dateIn = moment().startOf("month").format("YYYY-MM-DD");
const dateOut = moment().endOf("month").format("YYYY-MM-DD");

export function ChartPieDonut() {
  const { user } = useAuth();
  const userId = user?.id;

  const { data, isPending } = useQuery({
    queryFn: async () => {
      const response = await api.get<InsightStatus>(
        `insights/status/${userId}?dateIn=${dateIn}&dateOut=${dateOut}`
      );
      console.log(response);
      return response.data;
    },
    queryKey: ["insights-status", userId],
    enabled: !!userId,
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
    return chartData.reduce((acc, curr) => acc + curr.quantidade, 0);
  }, []);

  if (isPending) {
    return <Skeleton className="w-[220px] h-[240px] bg-muted" />;
  }

  return (
    <Card className="flex text-center flex-col max-w-[320px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status dos pedidos</CardTitle>
        <CardDescription className="text-xs">
          Mostrandos vendas efetuadas no mês
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-foreground text-3xl font-bold"
                        >
                          {totalSales}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Vendas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
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
                <span className="text-foreground font-semibold text-sm">
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
