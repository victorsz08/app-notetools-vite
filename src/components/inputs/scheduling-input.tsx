import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

export interface SchedulingValue {
  date: Date;
  time: string;
}

interface TimeOptions {
  value: string;
}

interface SchedulingInputProps {
  value: SchedulingValue;
  onChange: (value: SchedulingValue) => void;
}

const timeOptions: TimeOptions[] = [
  { value: "08:00 - 12:00" },
  { value: "08:00 - 19:00" },
  { value: "12:00 - 15:00" },
  { value: "12:00 - 18:00" },
  { value: "15:00 - 18:00" },
];

export function SchedulingInput({ value, onChange }: SchedulingInputProps) {
  function handleDateChange(date?: Date) {
    if (date) {
      onChange({
        time: value.time,
        date,
      });
    }
  }

  function handleTimeChange(time?: string) {
    if (time) {
      onChange({
        date: value?.date,
        time,
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="flex bg-card h-12 hover:bg-card items-center font-normal text-muted-foreground justify-start gap-2"
        >
          <CalendarIcon className="w-4 h-4" />
          {value && (
            <>
              {value.date && (
                <span>
                  {format(value.date, "dd MMM yyyy", { locale: ptBR })}
                </span>
              )}
              {value.time && <span>{value.time}</span>}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full flex items-center gap-4">
        <Calendar
          mode="single"
          locale={ptBR}
          selected={value?.date}
          onSelect={(date) => {
            handleDateChange(date);
          }}
        />
        <div className="flex flex-col gap-1 w-full">
          {timeOptions.map((item, index) => (
            <Button
              key={index}
              type="button"
              variant={item.value === value?.time ? "default" : "outline"}
              onClick={() => handleTimeChange(item.value)}
              className="font-normal"
            >
              {item.value}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
