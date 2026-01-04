import type { Drift } from '../types';

export type TrendDirection = 'up' | 'down' | 'flat';
export type TrendEmphasis = 'volatility' | 'baseline';

export interface TrendTooltipOptions {
  period?: string;
  metricName?: string;
  emphasis?: TrendEmphasis;
}

export interface TrendMeta {
  direction: TrendDirection;
  emphasis?: TrendEmphasis;
  magnitude?: number;
}

function normalisePeriod(period?: string): string {
  if (!period) {
    return 'recent periods';
  }
  const trimmed = period.trim();
  if (trimmed.length === 0) {
    return 'recent periods';
  }
  return trimmed;
}

/**
 * Returns an explainable tooltip string for trend indicators.
 * Ensures every visual signal communicates scope, meaning, and limitation.
 */
export function trendTooltip(direction: TrendDirection, options: TrendTooltipOptions = {}): string {
  const period = normalisePeriod(options.period);
  const metricLabel = options.metricName ? `${options.metricName} – ` : '';

  if (options.emphasis === 'volatility') {
    return `${metricLabel}Volatility detected over ${period}. Interpret cautiously; this reflects historical variability and is not forward guidance.`;
  }

  switch (direction) {
    case 'up':
      return `${metricLabel}Improvement observed over ${period}. Indicates a positive historical trend; this is descriptive, not a forecast.`;
    case 'down':
      return `${metricLabel}Decline observed over ${period}. Signals weakening historical performance; not a recommendation.`;
    case 'flat':
    default:
      return `${metricLabel}No significant change over ${period}. Performance remains within historical bounds; purely informational.`;
  }
}

export function deriveTrendMetaFromDrift(drift?: Drift | null): TrendMeta {
  if (!drift) {
    return { direction: 'flat' };
  }

  if (drift.drift_flag) {
    return { direction: 'flat', emphasis: 'volatility', magnitude: drift.magnitude };
  }

  if (drift.magnitude > 0) {
    return { direction: 'up', magnitude: drift.magnitude };
  }

  if (drift.magnitude < 0) {
    return { direction: 'down', magnitude: drift.magnitude };
  }

  return { direction: 'flat', magnitude: drift.magnitude };
}
