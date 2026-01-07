import type { CompanyResponse, CoverageIndexResponse, MarketFacts, StocksResponse, StockDetailResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8002';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(endpoint: string, method: HttpMethod = 'GET', body?: unknown): Promise<T> {
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

  return response.json() as Promise<T>;
}

export const api = {
  getStocks: (skip: number = 0, limit: number = 50) => request<StocksResponse>(`/api/companies?skip=${skip}&limit=${limit}`),
  getRegistry: (skip: number = 0, limit: number = 50) => request<StocksResponse>(`/companies/registry?skip=${skip}&limit=${limit}`),
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
  getIndexConstituents: (index: string) =>
    request<{ index: string; count: number; constituents: { symbol: string; name: string; sector: string }[] }>(`/api/indices/${index}/constituents`),
  getPeers: (symbol: string) => request<{ symbol: string; peers: any[] }>(`/api/peers/${symbol}`),
  getAdminStats: () => request<any>('/admin/stats'),
};

