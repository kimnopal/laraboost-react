import { AppSidebar } from '@/components/app-sidebar';
import AppSidebarHeader from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}
