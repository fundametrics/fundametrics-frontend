import { useState, useEffect } from 'react';
import { getRecentStocks, addToRecent as add } from '../utils/recentActivity';

export const useRecentActivity = () => {
    const [recentStocks, setRecentStocks] = useState<string[]>(getRecentStocks());

    useEffect(() => {
        const handleUpdate = (e: any) => {
            setRecentStocks(e.detail.list);
        };

        window.addEventListener('recent_activity_updated', handleUpdate);
        return () => window.removeEventListener('recent_activity_updated', handleUpdate);
    }, []);

    const addToRecent = (symbol: string) => add(symbol);

    return { recentStocks, addToRecent };
};
