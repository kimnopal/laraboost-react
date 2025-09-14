import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { toast } from 'sonner';

export default function Page() {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

    toast('ok');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>Dashboard</div>
        </AppLayout>
    );
}
