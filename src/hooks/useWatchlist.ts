import { useState, useEffect } from 'react';
import { getWatchlist, toggleWatchlist as toggle, isInWatchlist as check } from '../utils/watchlist';

export const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState<string[]>(getWatchlist());

    useEffect(() => {
        const handleUpdate = (e: any) => {
            setWatchlist(e.detail.list);
        };

        window.addEventListener('watchlist_updated', handleUpdate);
        return () => window.removeEventListener('watchlist_updated', handleUpdate);
    }, []);

    const toggleWatchlist = (symbol: string) => toggle(symbol);
    const isInWatchlist = (symbol: string) => check(symbol);

    return { watchlist, toggleWatchlist, isInWatchlist };
};
