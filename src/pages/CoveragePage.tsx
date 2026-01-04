import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import type { CoverageIndexResponse } from '../types';
import { formatFractionalPercentage } from '../utils/formatters';

const CoveragePage = () => {
  const [data, setData] = useState<CoverageIndexResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    api
      .getCoverageIndex()
      .then((payload) => {
        if (!isMounted) return;
        setData(payload);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error('Coverage fetch failed', err);
        if (!isMounted) return;
        setError('Coverage overview is temporarily unavailable.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const blockKeys = data ? Object.keys(data.totals.block_availability).sort() : [];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Data transparency</p>
        <h1 className="text-2xl font-semibold text-neutral-900">Coverage overview</h1>
        <p className="text-sm text-neutral-600 max-w-2xl">
          This page summarises which factual datasets Fundametrics processed for each company. Coverage indicates data presence
          only. It does not assess quality, performance, or suitability. Market data remains delayed as per exchange
          regulations.
        </p>
      </header>

      {loading ? (
        <div className="grid gap-4">
          <div className="h-32 rounded-xl border border-neutral-200 bg-white shadow-subtle animate-pulse" />
          <div className="h-64 rounded-xl border border-neutral-200 bg-white shadow-subtle animate-pulse" />
        </div>
      ) : null}

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-neutral-700">
          {error}
        </div>
      ) : null}

      {!loading && data ? (
        <>
          <section className="bg-white border border-neutral-200 rounded-xl shadow-subtle p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">At a glance</h2>
                <p className="text-sm text-neutral-500">Generated at {new Date(data.generated_at).toLocaleString()}</p>
              </div>
              <Link
                to="/stocks"
                className="inline-flex items-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-400"
              >
                View companies
              </Link>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-2">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Symbols covered</dt>
                <dd className="text-2xl font-semibold text-neutral-900">{data.totals.symbols}</dd>
                <p className="text-xs text-neutral-500">
                  Count of symbols with at least one processed Fundametrics run.
                </p>
              </div>
              {blockKeys.map((block) => (
                <div key={block} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-2">
                  <dt className="text-xs uppercase tracking-wide text-neutral-500">{block.replace(/_/g, ' ')}</dt>
                  <dd className="text-2xl font-semibold text-neutral-900">{data.totals.block_availability[block]}</dd>
                  <p className="text-xs text-neutral-500">Runs with this disclosure block present.</p>
                </div>
              ))}
            </dl>
          </section>

          <section className="bg-white border border-neutral-200 rounded-xl shadow-subtle p-6 space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900">Symbol coverage detail</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-neutral-50 text-neutral-500 uppercase text-xs tracking-wide">
                  <tr>
                    <th className="px-3 py-2 text-left">Symbol</th>
                    <th className="px-3 py-2 text-left">Company</th>
                    <th className="px-3 py-2 text-left">Sector</th>
                    <th className="px-3 py-2 text-left">Coverage</th>
                    <th className="px-3 py-2 text-left">Available blocks</th>
                    <th className="px-3 py-2 text-left">Missing blocks</th>
                    <th className="px-3 py-2 text-left">Last processed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {data.results.map((record) => (
                    <tr key={record.symbol}>
                      <td className="px-3 py-2 font-semibold text-neutral-900">{record.symbol}</td>
                      <td className="px-3 py-2 text-neutral-700">{record.name ?? 'Not disclosed'}</td>
                      <td className="px-3 py-2 text-neutral-500">{record.sector ?? 'Not disclosed'}</td>
                      <td className="px-3 py-2 text-neutral-700">
                        {formatFractionalPercentage(record.coverage.score, 0, 'Not available')}
                      </td>
                      <td className="px-3 py-2 text-neutral-600">
                        {record.coverage.available.length ? record.coverage.available.join(', ') : 'None'}
                      </td>
                      <td className="px-3 py-2 text-neutral-600">
                        {record.coverage.missing.length ? record.coverage.missing.join(', ') : 'None reported'}
                      </td>
                      <td className="px-3 py-2 text-neutral-500">
                        {record.last_processed ? new Date(record.last_processed).toLocaleString() : 'Not disclosed'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-neutral-500">
              Coverage is informational. Fundametrics does not score or rank companies, and coverage does not guarantee accuracy or
              completeness of disclosures.
            </p>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default CoveragePage;
