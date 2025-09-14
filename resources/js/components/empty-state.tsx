import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { LucideIcon, Package, Plus } from 'lucide-react';
import { ReactNode } from 'react';

type EmptyStateProps = {
    icon?: LucideIcon;
    title?: string;
    description?: string;
    action?: {
        label: string;
        href: string;
        icon?: LucideIcon;
    };
    children?: ReactNode;
};

export default function EmptyState({
    icon: Icon = Package,
    title = 'No data found',
    description = 'There are no items to display at the moment.',
    action,
    children,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                <Icon className="h-10 w-10 text-muted-foreground/60" strokeWidth={1.5} />
            </div>

            <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>

            {action && (
                <Button asChild size="sm" className="min-w-[140px]">
                    <Link href={action.href} className="text-sm">
                        {action.icon ? <action.icon className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                        {action.label}
                    </Link>
                </Button>
            )}

            {children}
        </div>
    );
}
