import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from './ui/button';

interface SearchFormProps {
    placeholder?: string;
    initialValue?: string;
    onSearch?: (query: string) => void;
    className?: string;
}

export function SearchForm({ placeholder = 'Search...', initialValue = '', onSearch, className = 'w-full sm:w-72' }: SearchFormProps) {
    const [search, setSearch] = useState(initialValue);

    // Debounced search function
    const performSearch = (query: string) => {
        if (onSearch) {
            onSearch(query);
        } else {
            router.get(window.location.pathname, query ? { search: query } : {}, {
                preserveState: true,
                replace: true,
            });
        }
    };

    const { debouncedCallback: debouncedSearch, cancel } = useDebounce(performSearch, 300);

    // Effect to trigger search when input changes
    useEffect(() => {
        // Skip empty initial value to avoid unnecessary API call on mount
        if (search === initialValue && initialValue === '') {
            return;
        }

        debouncedSearch(search);
    }, [search, debouncedSearch, initialValue]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Cancel debounced search and perform immediately
        cancel();
        performSearch(search);
    };

    const handleClear = () => {
        setSearch('');
        // Cancel any pending search
        cancel();
        // Immediately clear search
        performSearch('');
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value)} className="pr-9 pl-9" />
                {search && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="absolute top-1/2 right-1 size-7 -translate-y-1/2 p-0 hover:bg-transparent"
                    >
                        <X className="size-3" />
                    </Button>
                )}
            </div>
        </form>
    );
}
