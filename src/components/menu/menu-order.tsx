import type { DataOrder } from "@/@types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { UpdateSchedulingForm } from "../forms/update-scheduling-form";
import { UpdateStatusForm } from "../forms/update-status-form";





export function MenuOrder({ data } : { data: DataOrder }) {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer p-1 rounded-sm hover:bg-muted transition-colors">
                <Ellipsis/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col">
                <DropdownMenuItem asChild>
                    <UpdateSchedulingForm data={data}/>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateStatusForm data={data}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}