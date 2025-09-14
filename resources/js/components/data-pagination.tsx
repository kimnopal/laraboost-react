import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { Link as LinkType } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface DataPaginationProps {
    data: {
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        total: number;
        next_page_url: string | null;
        prev_page_url: string | null;
        links: LinkType[];
    };
    className?: string;
}

export function DataPagination({ data, className }: DataPaginationProps) {
    const { last_page, from, to, total, prev_page_url, next_page_url, links } = data;

    if (last_page <= 1 || total === 0) {
        return null;
    }

    const pageLinks = links.slice(1, -1);

    return (
        <div className={`flex items-center justify-between ${className || ''}`}>
            {/* Results info */}
            <div className="text-sm text-muted-foreground">
                Showing {from.toLocaleString()} to {to.toLocaleString()} of {total.toLocaleString()} results
            </div>

            {/* Pagination controls */}
            <Pagination className="mx-0 w-fit">
                <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                        {prev_page_url ? (
                            <Link href={prev_page_url} preserveState className="cursor-pointer">
                                <Button variant="ghost">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span>Previous</span>
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="ghost" className="pointer-events-none text-muted-foreground opacity-50">
                                <ChevronLeft className="h-4 w-4" />
                                <span>Previous</span>
                            </Button>
                        )}
                    </PaginationItem>

                    {/* Page Numbers */}
                    {pageLinks.map((link, index) => (
                        <PaginationItem key={`${link.label}-${index}`}>
                            {link.label === '...' ? (
                                <PaginationEllipsis />
                            ) : link.url ? (
                                <Link href={link.url} preserveState>
                                    <Button variant={link.active ? 'outline' : 'ghost'} size="icon">
                                        {link.label}
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="ghost" size="icon">
                                    {link.label}
                                </Button>
                            )}
                        </PaginationItem>
                    ))}

                    {/* Next Button */}
                    <PaginationItem>
                        {next_page_url ? (
                            <Link href={next_page_url} preserveState>
                                <Button variant={'ghost'}>
                                    <span>Next</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Button variant="ghost" className="pointer-events-none text-muted-foreground opacity-50">
                                <span>Next</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
