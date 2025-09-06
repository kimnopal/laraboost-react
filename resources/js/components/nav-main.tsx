import { type LucideIcon } from 'lucide-react';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';

export function NavMain({
    menuItem,
}: {
    menuItem: {
        title: string;
        links: {
            name: string;
            url: string;
            icon: LucideIcon;
            isActive: boolean;
        }[];
    };
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{menuItem.title}</SidebarGroupLabel>
            <SidebarMenu>
                {menuItem.links.map((link) => (
                    <SidebarMenuItem key={link.name}>
                        <SidebarMenuButton asChild>
                            <Link href={link.url}>
                                <link.icon />
                                <span>{link.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
