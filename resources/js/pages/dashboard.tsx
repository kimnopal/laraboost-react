import { AppSidebar } from '@/components/app-sidebar';
import AppSidebarHeader from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Page() {
    const { props } = usePage();

    console.log(props);
    toast('ok');

    useEffect(() => {
        if (props.success) {
            toast('ok');
        }
    });

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppSidebarHeader />
                    <main className="flex flex-1 flex-col gap-4 p-4 pt-0"></main>
                    <Toaster />
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
