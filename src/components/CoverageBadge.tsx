import type { FC } from 'react';
import type { CoverageSummary } from '../types';
import { formatPercentage } from '../utils/formatters';

interface CoverageBadgeProps {
  coverage?: CoverageSummary;
}

const CoverageBadge: FC<CoverageBadgeProps> = ({ coverage }) => {
  if (!coverage) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-600" title="Coverage shows which factual datasets were processed in the latest Fundametrics run. It does not indicate performance or provide recommendations.">
      <span className="inline-flex h-2 w-2 rounded-full bg-neutral-500" aria-hidden="true" />
      <span className="font-semibold text-neutral-800">Coverage</span>
      <span className="text-neutral-500">{formatPercentage(coverage.score)}</span>
    </div>
  );
};

export default CoverageBadge;
