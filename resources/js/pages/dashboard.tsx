import { AppSidebar } from '@/components/app-sidebar';
import AppSidebarHeader from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0"></main>
            </SidebarInset>
        </SidebarProvider>
    );
}
