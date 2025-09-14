import { AppSidebar } from '@/components/app-sidebar';
import AppSidebarHeader from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { BreadcrumbItem } from '@/types';

type AppLayoutProps = {
    children: React.ReactNode;
    breadcrumbs: BreadcrumbItem[];
};

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}
