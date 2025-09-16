import { useCallback } from 'react';
import { toast } from 'sonner';
import { Toast } from '@/types';

export function useToast() {
    const showToast = useCallback((val: Toast) => {
        if (!val || !val.type) return;

        const toastTypes = {
            success: toast.success,
            error: toast.error,
            info: toast.info,
            warning: toast.warning,
        } as const;

        const toastFunction = toastTypes[val.type] || toast;
        toastFunction(val.title, {
            description: val.description,
        });
    }, []);

    return { showToast };
}