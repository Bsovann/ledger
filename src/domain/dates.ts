import { formatInTimeZone } from "date-fns-tz";
import type { LocalDate } from "./types";

/** The calendar date an instant falls on in the given IANA time zone. */
export function toLocalDate(instant: Date, timeZone: string): LocalDate {
  return formatInTimeZone(instant, timeZone, "yyyy-MM-dd");
}

/** ISO weekday of a local date: 1 = Monday … 7 = Sunday. */
export function isoWeekday(date: LocalDate): number {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay();
  return day === 0 ? 7 : day;
}

/** Shift a local date by whole days, safe across DST because it works in UTC. */
export function addDays(date: LocalDate, days: number): LocalDate {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
