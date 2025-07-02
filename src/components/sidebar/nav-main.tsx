'use client';

import type { LucideIcon } from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../ui/sidebar';

type NavMenuType = {
    items: {
        title: string;
        href: string;
        icon: LucideIcon;
    }[];
};

export function NavMenu({ items }: NavMenuType) {

    return (
      <SidebarGroup>
        <SidebarGroupLabel className='text-muted-foreground'>
          Navegação
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="gap-1">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="transition-colors text-sidebar-accent-foreground/70 text-xs duration-200 
                    hover:bg-sidebar-accent hover:text-sidebar-accent-foreground/70"
                >
                  <a
                    href={item.href}
                    className="flex font-medium items-center gap-2"
                  >
                    <item.icon strokeWidth={2} className="h-4 w-4" />
                    <span className="truncate">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
}
