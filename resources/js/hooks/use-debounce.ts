import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for debouncing function calls
 *
 * @param callback - Function to be debounced
 * @param delay - Delay in milliseconds
 * @returns Object with debounced function and cancel method
 */
export function useDebounce(callback: (value: string) => void, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const callbackRef = useRef(callback);

    // Update callback ref when callback changes
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const debouncedCallback = (value: string) => {
        // Clear previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            callbackRef.current(value);
            timeoutRef.current = null;
        }, delay);
    };

    const cancel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const isActive = () => timeoutRef.current !== null;

    return {
        debouncedCallback,
        cancel,
        isActive,
    };
}

/**
 * Custom hook for debouncing values
 *
 * @param value - Value to be debounced
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}
