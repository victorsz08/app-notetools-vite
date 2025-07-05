import { File } from "lucide-react";
import { CreateOrderForm } from "../forms/create-order-form";





export function NotFoundOrders() {
    return (
        <div className="w-full flex flex-col gap-2 items-center justify-center h-64">
            <File className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <h1 className="text-xl font-semibold text-muted-foreground">
                Opa!
              </h1>
              <small className="text-xs font-normal text-muted-foreground/70">
                Nenhum pedido com agendamento para hoje.
              </small>
            </div>
            <CreateOrderForm />
          </div>
    )
}