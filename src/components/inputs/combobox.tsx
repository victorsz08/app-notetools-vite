import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";

export function CidadeCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { data: cities } = useQuery<string[]>({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await api.get("cities");
      const data = response.data;

      return data;
    },
    refetchOnWindowFocus: false,
    initialData: [],
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCities =
    search.length >= 3
      ? cities.filter((city) =>
          city.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="w-full bg-card flex items-center justify-start 
          border-muted-foreground/30 font-normal text-muted-foreground h-12 border px-3 py-2 text-sm text-left"
        >
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full  p-0">
        <Command>
          <CommandInput
            placeholder="Buscar cidade..."
            onValueChange={setSearch}
          />
          <CommandList className="text-muted-foreground">
            <CommandEmpty>Nenhuma cidade encontrada</CommandEmpty>
            {filteredCities.map((city) => (
              <CommandItem
                key={city}
                onSelect={() => {
                  onChange(city);
                  setOpen(false);
                }}
              >
                {city}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
