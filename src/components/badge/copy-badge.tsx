import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
interface CopyBadgeProps {
  value: string;
}

export function CopyBadge({ value }: CopyBadgeProps) {
  function handleCopyValue() {
    const text = value.replace(/\D/g, "");
    navigator.clipboard.writeText(text);

    toast.success("Copiado para a área de transferência!")
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Copy
          onClick={handleCopyValue}
          className="h-4 w-4 text-muted-foreground/80 hover:text-muted-foreground cursor-pointer"
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Copiar</p>
      </TooltipContent>
    </Tooltip>
  );
}
