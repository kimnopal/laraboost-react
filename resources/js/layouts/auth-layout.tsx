import { Toaster } from '@/components/ui/sonner';
import { useToast } from '@/hooks/use-toast';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    const page = usePage<SharedData>();
    const { showToast } = useToast();

    useEffect(() => {
        if (page.props.toast) {
            showToast(page.props.toast);
        }
    }, [page.props.toast, showToast]);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                {children}
                <Toaster position="top-right" richColors />
            </div>
        </div>
    );
}
