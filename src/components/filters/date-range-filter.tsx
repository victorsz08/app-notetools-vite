import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { Button } from "../ui/button";

interface SchedulingFilterProps {
  date?: DateRange;
  onChange?: (date?: DateRange) => void;
  children?: React.ReactNode;
}

export function DateRangeFilter({
  date,
  onChange,
  children,
}: SchedulingFilterProps) {
  const [dateCraft, setDateCraft] = useState<DateRange | undefined>(date);
  const [open, setOpen] = useState<boolean>(false);

  function handleChangeDate() {
      onChange?.(dateCraft);
      setOpen(false);
  }

  function clearDate() {
    setDateCraft(undefined);
    onChange?.(undefined);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end">
        <Calendar
          mode="range"
          locale={ptBR}
          selected={dateCraft}
          onSelect={(date) => {
            setDateCraft(date);
          }}
        />
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-8 text-xs"
            onClick={() => clearDate()}
          >
            Limpar filtros
          </Button>
          <Button
            type="button"
            className="h-8 text-xs"
            onClick={handleChangeDate}
          >
            Filtrar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
