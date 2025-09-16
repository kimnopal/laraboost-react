import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';

export default function Page() {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>Dashboard</div>
        </AppLayout>
    );
}
