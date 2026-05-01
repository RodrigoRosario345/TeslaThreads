import { useEffect } from 'react';

interface UseClickOutsideProps {
    ref: React.RefObject<HTMLElement | null>;
    callback: () => void;
}

export function useClickOutside({ ref, callback }: UseClickOutsideProps) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // If the referenced element exists and the click target is outside of it, call the callback function
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        // Add event listener to detect clicks outside the referenced element
        document.addEventListener('mousedown', handleClickOutside);

        // clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}