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
import categories from '@/routes/categories';
import permissions from '@/routes/permissions';
import roles from '@/routes/roles';
import { Link } from '@inertiajs/react';
import { Group, Home, Lock, Newspaper, Tag, User } from 'lucide-react';
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
                    url: dashboard().url,
                    icon: Home,
                    isActive: true,
                },
                {
                    name: 'Categories',
                    url: categories.index().url,
                    icon: Tag,
                    isActive: false,
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
                    url: roles.index().url,
                    icon: Group,
                    isActive: false,
                },
                {
                    name: 'Permissions',
                    url: permissions.index().url,
                    icon: Lock,
                    isActive: true,
                },
                {
                    name: 'Users',
                    url: '#',
                    icon: User,
                    isActive: false,
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
                                <div className="flex aspect-square size-8 items-center justify-center rounded-md border border-secondary">LB</div>
                                <div className="flex flex-col">
                                    <h2 className="font-semibold">LaraBoost</h2>
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
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
