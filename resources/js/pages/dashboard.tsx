import AppLayout from '@/layouts/app-layout';
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
        <AppLayout>
            <div>Dashboard</div>
        </AppLayout>
    );
}
