import type { CompanyResponse, CoverageIndexResponse, MarketFacts, StocksResponse, StockDetailResponse } from '../types';

const isProd = import.meta.env.PROD;
const API_BASE_URL = isProd
  ? 'https://fundametrics-backend.onrender.com'
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8002');

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const CACHE = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function request<T>(endpoint: string, method: HttpMethod = 'GET', body?: unknown): Promise<T> {
  const cacheKey = `${method}:${endpoint}:${body ? JSON.stringify(body) : ''}`;

  // Cache Check for GET requests
  if (method === 'GET') {
    const cached = CACHE.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      return cached.data as T;
    }
  }

  const token = localStorage.getItem('finox_admin_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['x-admin-token'] = token;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Cache Set for GET requests
  if (method === 'GET') {
    CACHE.set(cacheKey, { data, timestamp: Date.now() });
  }

  return data as T;
}

export const api = {
  getStocks: (skip: number = 0, limit: number = 50, sort_by: string = 'symbol', order: number = 1, filters: any = {}) => {
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
      sort_by,
      order: order.toString()
    });
    if (filters.searchQuery) params.append('q', filters.searchQuery);
    if (filters.sector && filters.sector !== 'all') params.append('sector', filters.sector);
    if (filters.minCap) params.append('min_market_cap', filters.minCap);
    if (filters.maxCap) params.append('max_market_cap', filters.maxCap);
    if (filters.minROE) params.append('min_roe', filters.minROE);
    if (filters.maxPE) params.append('max_pe', filters.maxPE);
    if (filters.symbols && Array.isArray(filters.symbols)) {
      params.append('symbols', filters.symbols.join(','));
    }

    return request<StocksResponse>(`/api/companies?${params.toString()}`);
  },
  getRegistry: (skip: number = 0, limit: number = 50, status?: string) =>
    request<StocksResponse>(`/companies/registry?skip=${skip}&limit=${limit}${status ? `&status=${status}` : ''}`),
  getCompany: (symbol: string) => request<StockDetailResponse>(`/api/company/${symbol}`),
  getCompanyStatus: (symbol: string) => request<{ status: string; message: string }>(`/company/${symbol}/status`),
  generateCompanyData: (symbol: string) => request<{ status: string; message: string }>(`/company/${symbol}/generate`, 'POST'),
  adminGenerateCompanyData: (symbol: string) => request<{ status: string; message: string }>(`/admin/company/${symbol}/generate`, 'POST'),
  getMarketFacts: (symbol: string) => request<MarketFacts>(`/api/stocks/${symbol}/market`),
  getCoverageIndex: () => request<CoverageIndexResponse>("/coverage"),
  searchSymbols: (query: string, sector?: string) =>
    request<{ query: string; results: { symbol: string; name: string; sector: string; status: string }[]; disclaimer: string }>(
      `/api/search?q=${encodeURIComponent(query)}${sector ? `&sector=${encodeURIComponent(sector)}` : ""}`,
    ),
  searchRegistry: (query: string) =>
    request<{ query: string; results: { symbol: string; name: string; sector: string; status: string }[]; disclaimer: string }>(
      `/api/search?q=${encodeURIComponent(query)}`,
    ),
  getSectors: () => request<string[]>("/api/sectors"),
  checkComparison: (metric_a: any, metric_b: any) =>
    request<{ comparable: boolean; reason: string | null }>("/api/v1/compare/check", "POST", { metric_a, metric_b }),
  getIndices: () => request<string[]>("/api/indices"),
  getIndicesPrices: () => request<{ id: string, label: string, price: number, change: number, changePercent: number, symbol: string }[]>("/api/indices/prices"),
  getIndexConstituents: (index: string) =>
    request<{ index: string; count: number; constituents: { symbol: string; name: string; sector: string; currentPrice?: number }[] }>(`/api/indices/${index}/constituents`),
  getPeers: (symbol: string) => request<{ symbol: string; peers: any[] }>(`/api/peers/${symbol}`),
  getAdminStats: () => request<any>('/admin/stats'),
};

