export const formatPercentage = (value: number | null | undefined, fallback = 'Not available') => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }
  return `${(value * 100).toFixed(0)}%`;
};

export const formatFractionalPercentage = (value: number | null | undefined, digits = 1, fallback = 'Not available') => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }
  return `${(value * 100).toFixed(digits)}%`;
};

export const formatNumber = (value: number | null | undefined, fallback = 'Not available') => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(value);
};
