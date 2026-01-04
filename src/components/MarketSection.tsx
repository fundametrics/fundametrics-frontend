import type { FC } from 'react';
import type { MarketFacts } from '../types';

interface MarketSectionProps {
  market?: MarketFacts['market'] | null;
}

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 2,
});

const formatValue = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'Delayed / Unavailable';
  }
  return numberFormatter.format(value);
};

const MarketSection: FC<MarketSectionProps> = ({ market }) => {
  const metadata = market?.metadata;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title mb-0">Delayed market data</h2>
          <span className="text-xs text-neutral-500">
            Delay disclosure: {metadata?.delay_disclaimer ?? 'Not available'}
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="border border-neutral-200 rounded-lg p-4">
            <p className="text-neutral-500">Last traded price</p>
            <p className="mt-2 text-xl font-semibold text-neutral-900">
              {market?.price?.value !== undefined && market?.price?.value !== null
                ? `${formatValue(market.price.value)} ${market.price.currency ?? ''}`.trim()
                : 'Delayed / Unavailable'}
            </p>
            <p className="text-xs text-neutral-500">
              Reported delay: {market?.price?.delay_minutes ?? 'Delayed / Unavailable'} minutes
            </p>
          </div>
          <div className="border border-neutral-200 rounded-lg p-4">
            <p className="text-neutral-500">Market capitalisation</p>
            <p className="mt-2 text-xl font-semibold text-neutral-900">
              {market?.market_cap?.value !== undefined && market?.market_cap?.value !== null
                ? `${formatValue(market.market_cap.value)} ${market.market_cap.currency ?? ''}`.trim()
                : 'Delayed / Unavailable'}
            </p>
            <p className="text-xs text-neutral-500">
              Computation note: {market?.market_cap?.computed ?? 'Delayed / Unavailable'}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-500 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-3 py-2 text-left">Metric</th>
                <th className="px-3 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="px-3 py-2 text-neutral-700">52-week high</td>
                <td className="px-3 py-2 text-neutral-900 font-medium">
                  {market?.range_52_week?.high !== undefined && market?.range_52_week?.high !== null
                    ? `${formatValue(market.range_52_week.high)} ${market.range_52_week.currency ?? ''}`.trim()
                    : 'Delayed / Unavailable'}
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-neutral-700">52-week low</td>
                <td className="px-3 py-2 text-neutral-900 font-medium">
                  {market?.range_52_week?.low !== undefined && market?.range_52_week?.low !== null
                    ? `${formatValue(market.range_52_week.low)} ${market.range_52_week.currency ?? ''}`.trim()
                    : 'Delayed / Unavailable'}
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-neutral-700">Shares outstanding</td>
                <td className="px-3 py-2 text-neutral-900 font-medium">
                  {market?.shares_outstanding?.value !== undefined && market?.shares_outstanding?.value !== null
                    ? `${formatValue(market.shares_outstanding.value)} ${market.shares_outstanding.currency ?? ''}`.trim()
                    : 'Delayed / Unavailable'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-subtle space-y-3 text-sm text-neutral-600">
        <p className="font-semibold text-neutral-800">Disclosures</p>
        <p>{metadata?.delay_disclaimer ?? 'Delay disclosure not provided.'}</p>
        <p>{metadata?.source_disclaimer ?? 'Source disclaimer not provided.'}</p>
        <p className="text-xs text-neutral-500">Last updated: {metadata?.last_updated ?? 'Delayed / Unavailable'}</p>
      </div>
    </div>
  );
};

export default MarketSection;
