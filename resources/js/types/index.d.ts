import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    toast: Toast;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Toast {
    type: 'success' | 'error' | 'info' | 'warning' | null;
    title: string;
    description: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Link {
    active: boolean;
    label: string;
    page: number;
    url: string;
}

export interface Pagination<T> {
    data: T[];
    links: LinkType[];
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}
