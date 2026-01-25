/**
 * Recent Activity Utility - Phase 7
 * Tracks last 10 viewed stocks.
 */

const RECENT_KEY = 'fundametrics_recent_stocks';

export const getRecentStocks = (): string[] => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch (e) {
        return [];
    }
};

export const addToRecent = (symbol: string) => {
    const current = getRecentStocks();
    const upSymbol = symbol.toUpperCase();

    // Remove if exists to move to top, limit to 10
    const next = [upSymbol, ...current.filter(s => s !== upSymbol)].slice(0, 10);

    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('recent_activity_updated', { detail: { symbol: upSymbol, list: next } }));
};
