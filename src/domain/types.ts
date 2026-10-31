// Pure domain types. Nothing in src/domain may import from app/, application/ or infrastructure/.

/** A calendar date in the user's time zone, "YYYY-MM-DD". */
export type LocalDate = string;

export type Schedule =
  | { type: "daily" }
  | { type: "weekdays"; days: number[] } // ISO weekdays, 1 = Mon … 7 = Sun
  | { type: "times_per_week"; target: number };

export interface Habit {
  id: string;
  name: string;
  identityStatement: string;
  twoMinuteVersion: string;
  schedule: Schedule;
  stackedOnHabitId?: string;
  createdOn: LocalDate;
}

export interface CheckIn {
  habitId: string;
  localDate: LocalDate;
}
