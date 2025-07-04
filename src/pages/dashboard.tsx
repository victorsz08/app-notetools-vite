import { BarChartSales } from "@/components/charts/bar-chart";
import { ChartPieDonut } from "@/components/charts/donut-chart";
import { SearchStreet } from "@/components/forms/search-street";
import { Insights } from "@/components/insights/insights";
import { NextOrders } from "@/components/table/next-orders";

export function Dahsboard() {
  return (
    <section className="w-full h-full p-4 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-muted-foreground">
          Dashboard
        </h1>
        <small className="text-xs text-light text-muted-foreground/80">
          Gerencie todas suas metricas.
        </small>
      </div>
      <Insights />
      <SearchStreet />
      <section className="flex space-x-4 w-full">
        <ChartPieDonut />
        <BarChartSales />
      </section>
      <NextOrders />
    </section>
  );
}
