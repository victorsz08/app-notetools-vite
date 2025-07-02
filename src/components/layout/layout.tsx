import { Outlet } from "react-router-dom"
import { SidebarProvider } from "../ui/sidebar"
import AppSidebar from "../sidebar/app-sidebar"




export function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar collapsible="icon" variant="sidebar"/>
            <main>
                <Outlet/>
            </main>
        </SidebarProvider>
    )
};