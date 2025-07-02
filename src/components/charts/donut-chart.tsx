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
import { useAuth } from "@/context/auth-context";
import { useQuery } from "@tanstack/react-query";
import { useInsight } from "@/hooks/use-insight";
import moment from "moment";

const chartConfig = {
  vendas: {
    label: "Vendas",
  },
  conectado: {
    label: "Conectados",
    color: "var(--chart-1)",
  },
  pendente: {
    label: "Pendentes",
    color: "var(--chart-2)",
  },
  cancelado: {
    label: "Cancelados",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface InsightsStatus {
  connected: number;
  pending: number;
  cancelled: number;
}

export function DonutChart() {
  const { user } = useAuth();
  const userId = user?.id;

  const { getInsightStatus } = useInsight(userId);

  const { data, isPending } = useQuery<InsightsStatus>({
    queryKey: ["charts"],
    queryFn: getInsightStatus,
    enabled: !!userId,
  });

  const chartData = [
    {
      status: "conectado",
      quantity: data?.connected || 0,
      fill: "var(--color-conectado)",
    },
    {
      status: "pendente",
      quantity: data?.pending || 0,
      fill: "var(--color-pendente)",
    },
    {
      status: "cancelado",
      quantity: data?.cancelled || 0,
      fill: "var(--color-cancelado)",
    },
  ];
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [data, isPending]);

  console.log(totalVisitors);

  if (isPending) return <p>Carregando...</p>;

  return (
    <Card className="flex flex-col max-w-[320px]">
      <CardHeader className="items-center text-center pb-0">
        <CardTitle>Status de Pedidos</CardTitle>
        <CardDescription>
          {moment().startOf("month").format("MMM DD")}
          {" - "}
          {moment().endOf("month").format("MMM DD")}
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
              dataKey="quantity"
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
                          className="fill-black text-3xl font-bold"
                        >
                          {totalVisitors}
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
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
}
