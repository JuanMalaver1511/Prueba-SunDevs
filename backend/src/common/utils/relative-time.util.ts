const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const MONTH_IN_MS = 30 * DAY_IN_MS;
const YEAR_IN_MS = 365 * DAY_IN_MS;

type RelativeTimeUnit = {
  singular: string;
  plural: string;
  threshold: number;
};

const RELATIVE_TIME_UNITS: RelativeTimeUnit[] = [
  { singular: 'año', plural: 'años', threshold: YEAR_IN_MS },
  { singular: 'mes', plural: 'meses', threshold: MONTH_IN_MS },
  { singular: 'dia', plural: 'dias', threshold: DAY_IN_MS },
  { singular: 'hora', plural: 'horas', threshold: HOUR_IN_MS },
  { singular: 'minuto', plural: 'minutos', threshold: MINUTE_IN_MS },
];

export function toRelativeTimeLabel(
  isoDate: string,
  referenceDate: Date = new Date(),
): string {
  const publishedAt = new Date(isoDate);

  if (Number.isNaN(publishedAt.getTime())) {
    return 'Fecha desconocida';
  }

  const diffInMs = Math.abs(referenceDate.getTime() - publishedAt.getTime());
  const isFuture = publishedAt.getTime() > referenceDate.getTime();
  const unit =
    RELATIVE_TIME_UNITS.find(({ threshold }) => diffInMs >= threshold) ??
    RELATIVE_TIME_UNITS[RELATIVE_TIME_UNITS.length - 1];
  const value = Math.max(1, Math.floor(diffInMs / unit.threshold));
  const label = value === 1 ? unit.singular : unit.plural;

  return isFuture ? `En ${value} ${label}` : `Hace ${value} ${label}`;
}
