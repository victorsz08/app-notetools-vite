import type { DataOrder } from "@/@types";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import { BadgeStatus } from "../badge/badge-status";
import { currency } from "@/lib/utils";
import { Ellipsis } from "lucide-react";

interface DataTableProps {
  data: DataOrder[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <section className="overflow-hidden rounded-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° do contrato</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Data de agendamento</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Criado</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.number}</TableCell>
              <TableCell>{item.local}</TableCell>
              <TableCell>{item.schedulingDate}</TableCell>
              <TableCell>{item.schedulingTime}</TableCell>
              <TableCell>
                <BadgeStatus variant={item.status} />
              </TableCell>
              <TableCell>{item.contact}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{currency(item.price)}</TableCell>
              <TableCell>
                <Ellipsis />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
