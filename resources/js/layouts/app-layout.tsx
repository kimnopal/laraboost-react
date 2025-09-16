import { AppSidebar } from '@/components/app-sidebar';
import AppSidebarHeader from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { useToast } from '@/hooks/use-toast';
import { BreadcrumbItem, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

type AppLayoutProps = {
    children: React.ReactNode;
    breadcrumbs: BreadcrumbItem[];
};

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const page = usePage<SharedData>();
    const { showToast } = useToast();

    useEffect(() => {
        if (page.props.toast) {
            showToast(page.props.toast);
        }
    }, [page.props.toast, showToast]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
                <Toaster position="top-right" richColors />
            </SidebarInset>
        </SidebarProvider>
    );
}
