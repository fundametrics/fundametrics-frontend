import type { FC } from 'react';

interface DataFreshnessBadgeProps {
  asOfDate?: string | null;
}

const DataFreshnessBadge: FC<DataFreshnessBadgeProps> = ({ asOfDate }) => {
  const label = asOfDate && asOfDate.trim().length > 0 ? `As of ${asOfDate}` : 'As-of date not provided';

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600">
      <svg className="h-3.5 w-3.5 text-neutral-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M10 18C14.1421 18 17.5 14.6421 17.5 10.5C17.5 6.35786 14.1421 3 10 3C5.85786 3 2.5 6.35786 2.5 10.5C2.5 14.6421 5.85786 18 10 18Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M10 6.5V10.5L12.5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
};

export default DataFreshnessBadge;
