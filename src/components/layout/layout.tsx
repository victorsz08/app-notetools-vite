import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../sidebar/app-sidebar";
import { ToggleSidebar } from "../sidebar/toggle-sidebar";
import { Toaster } from "sonner";
import { AvatarMenu } from "../avatar/avatar-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { HouseIcon } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path !== "");
  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" variant="sidebar" />
      <main className="w-full">
        <header className="flex px-4 items-center justify-between h-20 bg-sidebar border-b border-border/60 w-full">
          <div className="flex items-center gap-2 justify-start">
            <ToggleSidebar />
            <Breadcrumb>
              <BreadcrumbList>
                <HouseIcon className="w-3 h-3 text-muted-foreground/60" />
                <BreadcrumbSeparator className="text-muted-foreground/60 text-xs">
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem className="text-xs text-muted-foreground/60">
                  Dashboard
                </BreadcrumbItem>
                {pathnames.length > 0 && (
                  <BreadcrumbSeparator className="text-muted-foreground/60 text-xs">
                    /
                  </BreadcrumbSeparator>
                )}
                {pathnames.map((path, index) => (
                  <div className="flex items-center gap-1" key={path}>
                    <BreadcrumbItem
                      className={`text-xs ${
                        location.pathname.endsWith(path)
                          ? "text-muted-foreground"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </BreadcrumbItem>
                    {index - 1 === pathnames.length && (
                      <BreadcrumbSeparator className="text-muted-foreground/60 text-xs">
                        /
                      </BreadcrumbSeparator>
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
            <AvatarMenu />
        </header>
        <Outlet />
      </main>
      <Toaster richColors />
    </SidebarProvider>
  );
}
