import { useState, useEffect } from 'react';

export const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('fundametrics_watchlist');
        if (stored) {
            try {
                setWatchlist(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse watchlist', e);
            }
        }
    }, []);

    const toggleWatchlist = (symbol: string) => {
        const next = watchlist.includes(symbol)
            ? watchlist.filter(s => s !== symbol)
            : [...watchlist, symbol];

        setWatchlist(next);
        localStorage.setItem('fundametrics_watchlist', JSON.stringify(next));
    };

    const isInWatchlist = (symbol: string) => watchlist.includes(symbol);

    return { watchlist, toggleWatchlist, isInWatchlist };
};
