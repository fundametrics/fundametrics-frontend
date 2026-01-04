import type { FC } from 'react';

interface ConfidenceMeterProps {
  financialsPresent: boolean;
  shareholdingPresent: boolean;
  marketPresent: boolean;
}

const segments = [
  {
    key: 'financials',
    label: 'Financials',
  },
  {
    key: 'shareholding',
    label: 'Shareholding',
  },
  {
    key: 'market',
    label: 'Market facts',
  },
] as const;

const ConfidenceMeter: FC<ConfidenceMeterProps> = ({ financialsPresent, shareholdingPresent, marketPresent }) => {
  const presenceMap: Record<(typeof segments)[number]['key'], boolean> = {
    financials: financialsPresent,
    shareholding: shareholdingPresent,
    market: marketPresent,
  };

  const availableCount = Object.values(presenceMap).filter(Boolean).length;
  const descriptor =
    availableCount === segments.length
      ? 'Multiple dimensions present'
      : availableCount > 0
        ? 'Partial disclosures available'
        : 'Awaiting core disclosures';

  return (
    <div className="border border-neutral-200 rounded-xl p-4 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-800">Confidence checkpoint</p>
        <span className="text-xs text-neutral-500">{descriptor}</span>
      </div>
      <div className="flex items-center gap-2">
        {segments.map((segment) => {
          const present = presenceMap[segment.key];
          return (
            <span
              key={segment.key}
              className={`flex-1 h-2 rounded-full transition ${present ? 'bg-neutral-800' : 'bg-neutral-200'}`}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <ul className="text-xs text-neutral-600 space-y-1">
        {segments.map((segment) => {
          const present = presenceMap[segment.key];
          return (
            <li key={segment.key} className="flex items-center gap-2">
              <span
                className={`inline-flex h-2 w-2 rounded-full ${present ? 'bg-neutral-800' : 'bg-neutral-300'}`}
                aria-hidden="true"
              />
              <span>
                {segment.label}: {present ? 'Available' : 'Not provided'}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-[11px] text-neutral-400">
        This meter summarises whether key factual datasets are present. It does not score quality or imply any
        recommendation.
      </p>
    </div>
  );
};

export default ConfidenceMeter;
