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
            <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Navegação
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                className="transition-colors text-xs duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                                <a
                                    href={item.href}
                                    className="flex items-center gap-3"
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <span className="truncate">
                                        {item.title}
                                    </span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
