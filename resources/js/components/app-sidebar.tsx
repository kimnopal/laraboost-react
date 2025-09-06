'use client';

import * as React from 'react';

import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';
import { Group, Home, Lock, Newspaper, User } from 'lucide-react';
import { NavMain } from './nav-main';

const data = {
    user: {
        name: 'admin',
        email: 'admin@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Menu',
            links: [
                {
                    name: 'Dashboard',
                    url: '#',
                    icon: Home,
                    isActive: true,
                },
                {
                    name: 'Posts',
                    url: '#',
                    icon: Newspaper,
                    isActive: false,
                },
            ],
        },
        {
            title: 'System',
            links: [
                {
                    name: 'Roles',
                    url: '#',
                    icon: Group,
                    isActive: false,
                },
                {
                    name: 'Users',
                    url: '#',
                    icon: User,
                    isActive: false,
                },
                {
                    name: 'Permissions',
                    url: '#',
                    icon: Lock,
                    isActive: true,
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link href={dashboard().url}>
                                <div className="flex flex-col">
                                    <h2 className="font-semibold">Jend Starter Kit</h2>
                                    <span className="text-xs">Laravel + React</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((menuItem) => (
                    <NavMain key={menuItem.title} menuItem={menuItem} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
