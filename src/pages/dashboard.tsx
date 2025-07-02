import { DonutChart } from "@/components/charts/donut-chart";
import { Insights } from "@/components/insights/insights";

export function Dahsboard() {
  return (
    <section className="w-full h-screen p-4 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-muted-foreground">
          Dashboard
        </h1>
        <small className="text-xs text-light text-muted-foreground/80">
          Gerencie todas suas metricas.
        </small>
      </div>
      <Insights />
      <section>
        <DonutChart />
      </section>
    </section>
  );
}
