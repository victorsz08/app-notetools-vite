import { BarChartSales } from "@/components/charts/bar-chart";
import { ChartPieDonut } from "@/components/charts/donut-chart";
import { SearchStreet } from "@/components/forms/search-street";
import { Insights } from "@/components/insights/insights";
import { RecentNotes } from "@/components/notes/recent-notes";
import { NextOrders } from "@/components/table/next-orders";
import { useAuth } from "@/context/auth-context";

export function Dahsboard() {
  const { user } = useAuth();

  return (
    <section className="w-full h-fit p-4 space-y-6">
      <div className="flex flex-col">
        <small className="text-xs text-light text-muted-foreground/80">
          Bem-vindo!
        </small>
        <h1 className="text-2xl font-semibold text-muted-foreground">
          Olá, {user?.firstName} {user?.lastName}
        </h1>
      </div>
      <Insights />
      <section className="flex gap-4 h-fit items-start">
        <div className="flex-2">
          <SearchStreet />
        </div>
        <div className="flex-1">
          <RecentNotes />
        </div>
      </section>
      <section className="flex space-x-4 w-full">
        <ChartPieDonut />
        <BarChartSales />
      </section>
      <NextOrders />
    </section>
  );
}
