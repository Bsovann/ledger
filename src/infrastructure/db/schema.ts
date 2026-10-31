import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
  type AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

const createdAt = () =>
  integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`);

export const users = sqliteTable("users", {
  id: id(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  // IANA zone, e.g. "America/New_York". Drives every "today" calculation (NFR-04).
  timeZone: text("time_zone").notNull(),
  createdAt: createdAt(),
});

export const habits = sqliteTable("habits", {
  id: id(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  // Law 2 — identity: "I am a person who reads" (FR-03)
  identityStatement: text("identity_statement").notNull(),
  // Law 3 — two-minute rule (FR-06)
  twoMinuteVersion: text("two_minute_version").notNull(),
  // Law 1 — implementation intention (FR-04), "HH:mm" local time
  cueTime: text("cue_time"),
  cueLocation: text("cue_location"),
  // Law 1 — habit stacking (FR-05)
  stackedOnHabitId: text("stacked_on_habit_id").references(
    (): AnySQLiteColumn => habits.id,
    { onDelete: "set null" },
  ),
  // Law 2 — temptation bundling (FR-12, P2)
  temptationBundle: text("temptation_bundle"),
  // Schedule (FR-08)
  scheduleType: text("schedule_type", {
    enum: ["daily", "weekdays", "times_per_week"],
  })
    .notNull()
    .default("daily"),
  // For "weekdays": ISO weekday numbers 1 (Mon) to 7 (Sun), e.g. "1,3,5"
  scheduleDays: text("schedule_days"),
  // For "times_per_week": 1 to 7
  targetPerWeek: integer("target_per_week"),
  archivedAt: integer("archived_at", { mode: "timestamp" }),
  createdAt: createdAt(),
});

export const checkIns = sqliteTable(
  "check_ins",
  {
    id: id(),
    habitId: text("habit_id")
      .notNull()
      .references(() => habits.id, { onDelete: "cascade" }),
    // The user's local calendar date, "YYYY-MM-DD" — never a timestamp (NFR-04)
    localDate: text("local_date").notNull(),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("check_ins_habit_date").on(t.habitId, t.localDate)],
);

export const scorecardItems = sqliteTable("scorecard_items", {
  id: id(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  // Habit scorecard (FR-11): + good, - bad, = neutral
  rating: text("rating", { enum: ["+", "-", "="] }).notNull(),
  position: integer("position").notNull().default(0),
});

export const shareLinks = sqliteTable("share_links", {
  id: id(),
  habitId: text("habit_id")
    .notNull()
    .references(() => habits.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  createdAt: createdAt(),
  revokedAt: integer("revoked_at", { mode: "timestamp" }),
});

export type User = typeof users.$inferSelect;
export type HabitRow = typeof habits.$inferSelect;
export type CheckInRow = typeof checkIns.$inferSelect;
