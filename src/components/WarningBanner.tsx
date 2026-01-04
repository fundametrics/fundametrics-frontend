import type { FC } from 'react';
import type { WarningMessage } from '../types';

interface WarningBannerProps {
  warnings?: WarningMessage[] | null;
}

const WarningBanner: FC<WarningBannerProps> = ({ warnings }) => {
  if (!warnings || warnings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-neutral-700">
      <p className="font-semibold text-neutral-800">Information notice</p>
      <ul className="mt-2 space-y-1 text-sm leading-relaxed">
        {warnings.map((warning) => (
          <li key={`${warning.code}-${warning.message}`}>
            {warning.message}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-neutral-500">
        These notices summarise processing gaps detected in the most recent run. They are informational only and do not
        indicate performance or recommendations.
      </p>
    </div>
  );
};

export default WarningBanner;
