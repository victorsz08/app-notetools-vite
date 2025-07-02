
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";




export function ToggleSidebar() {
        const { toggleSidebar } = useSidebar();
    return (
        <Button variant="ghost" onClick={toggleSidebar}>
                    <Menu className="w-3 h-3"/>
                </Button>
    )
}