import { BreadcrumbItem as BreadcrumbType } from '@/types';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

type AppSidebarHeaderProps = {
    breadcrumbs: BreadcrumbType[];
};

export default function AppSidebarHeader({ breadcrumbs }: AppSidebarHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <>
                            {breadcrumbs.slice(0, -1).map((breadcrumb) => (
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.title}</BreadcrumbLink>
                                </BreadcrumbItem>
                            ))}

                            {breadcrumbs.length > 1 && <BreadcrumbSeparator className="hidden md:block" />}

                            <BreadcrumbItem>
                                <BreadcrumbPage>{breadcrumbs[breadcrumbs.length - 1].title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
