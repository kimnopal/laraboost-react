import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

type SearchInputProps = {
    placeholder?: string;
    initialValue?: string;
    debounceMs?: number;
};

export default function SearchInput({ placeholder = 'Search...', initialValue = '', debounceMs = 300 }: SearchInputProps) {
    const [search, setSearch] = useState<string>(initialValue);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            router.get(window.location.pathname, search ? { search } : {}, {
                preserveState: true,
                replace: true,
                onFinish: () => {
                    timeoutRef.current = null;
                },
            });
        }, debounceMs);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [search, debounceMs]);

    const handleClear = () => {
        setSearch('');
    };

    return (
        <div className="relative w-full sm:w-72">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={placeholder} className="pr-9 pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
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
    );
}
