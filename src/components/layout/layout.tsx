import { Outlet } from "react-router-dom"
import { SidebarProvider } from "../ui/sidebar"
import AppSidebar from "../sidebar/app-sidebar"
import { ToggleSidebar } from "../sidebar/toggle-sidebar";
import { Toaster } from "sonner";



export function Layout() {

    return (
      <SidebarProvider>
        <AppSidebar collapsible="icon" variant="sidebar" />
        <main className="w-full">
          <header className="flex px-4 items-center justify-between h-20 bg-sidebar border-b border-border/60 w-full">
            <div>
                <ToggleSidebar/>
            </div>
          </header>
          <Outlet />
        </main>
        <Toaster richColors/>
      </SidebarProvider>
    );
};