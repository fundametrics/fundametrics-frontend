/**
 * Watchlist Utility - Phase 7
 * Manages device-local storage of stock symbols.
 */

const WATCHLIST_KEY = 'fundametrics_watchlist';

export const getWatchlist = (): string[] => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch (e) {
        return [];
    }
};

export const toggleWatchlist = (symbol: string): boolean => {
    const current = getWatchlist();
    const index = current.indexOf(symbol.toUpperCase());
    let next: string[];
    let added = false;

    if (index === -1) {
        next = [...current, symbol.toUpperCase()];
        added = true;
    } else {
        next = current.filter(s => s !== symbol.toUpperCase());
        added = false;
    }

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));

    // Dispatch custom event for UI reactivity
    window.dispatchEvent(new CustomEvent('watchlist_updated', { detail: { symbol, added, list: next } }));

    return added;
};

export const isInWatchlist = (symbol: string): boolean => {
    return getWatchlist().includes(symbol.toUpperCase());
};
