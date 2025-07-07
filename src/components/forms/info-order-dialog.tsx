import type { DataOrder } from "@/@types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Info } from "lucide-react";
import { Label } from "../ui/label";
import moment from "moment";
import { currency, formatPhoneNumber } from "@/lib/utils";
import { BadgeStatus } from "../badge/badge-status";
import { CopyBadge } from "../badge/copy-badge";

export function InfoOrderDialog({ data }: { data: DataOrder }) {
  return (
    <Dialog>
      <DialogTrigger className="text-xs w-full flex items-center gap-1 p-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
        <Info className="w-3 h-3" />
        <span>Informações</span>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-10 pb-8 w-full">
        <DialogHeader className="flex flex-col justify-start items-start">
          <DialogTitle>Informações do pedido</DialogTitle>
          <DialogDescription>
            Contrato: {data.number} - {data.local}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-2 justify-between w-full items-center gap-6">
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-xs text-muted-foreground/80">
                N° do contrato
              </Label>
              <span className="text-sm flex items-center gap-1 font-semibold tracking-tight text-foreground/60">
                {data.number}
                <CopyBadge value={data.number.toString()}/>
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-xs text-muted-foreground/80">Cidade</Label>
              <span className="text-sm font-semibold tracking-tight text-foreground/60">
                {data.local}
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-xs text-muted-foreground/80">
                Data de agendamento
              </Label>
              <span className="text-sm font-semibold tracking-tight text-foreground/60">
                {moment(data.schedulingDate).format("DD MMM YYYY")}
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-xs text-muted-foreground/80">
                Horário
              </Label>
              <span className="text-sm font-semibold tracking-tight text-foreground/60">
                {data.schedulingTime}
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-xs text-muted-foreground/80">
                Contato
              </Label>
              <span className="text-sm flex items-center gap-1 font-semibold tracking-tight text-foreground/60">
                {formatPhoneNumber(data.contact)}
                <CopyBadge value={data.contact}/>
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-xs text-muted-foreground/80">Preço</Label>
              <span className="text-sm font-semibold tracking-tight text-foreground/60">
                {currency(data.price)}
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-xs text-muted-foreground/80">Status</Label>
              <span className="text-sm font-semibold tracking-tight text-foreground/60">
                <BadgeStatus variant={data.status} />
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-xs text-muted-foreground/80">Criado</Label>
              <span className="text-sm font-semibold tracking-tight text-foreground/60">
                {moment(data.createdAt).format("DD MMM YYYY")}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
