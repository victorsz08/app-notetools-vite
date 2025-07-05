import { type Status } from "@/@types";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BadgeStatus } from "../badge/badge-status";
import { Button } from "../ui/button";

interface StatusFilterProps {
  status?: Status;
  onChange?: (status?: Status) => void;
  children?: React.ReactNode;
}

export function StatusFilter({
  status,
  onChange,
  children,
}: StatusFilterProps) {
  const [statusCraft, setStatusCraft] = useState<Status | undefined>(status);
  const [open, setOpen] = useState<boolean>(false);

  function handleOnChange() {
    onChange?.(statusCraft);
    setOpen(false);
  }
  function clearDate() {
    setStatusCraft(undefined);
    onChange?.(undefined);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <Select
          value={statusCraft}
          onValueChange={(value: Status) => setStatusCraft(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="--selecione um status--" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDENTE">
              <BadgeStatus variant="PENDENTE" />
            </SelectItem>
            <SelectItem value="CONECTADO">
              <BadgeStatus variant="CONECTADO" />
            </SelectItem>
            <SelectItem value="CANCELADO">
              <BadgeStatus variant="CANCELADO" />
            </SelectItem>
          </SelectContent>
        </Select>
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
            onClick={handleOnChange}
          >
            Filtrar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
