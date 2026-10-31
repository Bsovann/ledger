import { describe, expect, it } from "vitest";
import { addDays, isoWeekday, toLocalDate } from "./dates";

describe("toLocalDate", () => {
  it("uses the user's zone, not UTC", () => {
    // 02:30 UTC on Nov 1 is still Oct 31 in New York
    const instant = new Date("2026-11-01T02:30:00Z");
    expect(toLocalDate(instant, "America/New_York")).toBe("2026-10-31");
    expect(toLocalDate(instant, "Asia/Tokyo")).toBe("2026-11-01");
  });
});

describe("isoWeekday", () => {
  it("maps Monday to 1 and Sunday to 7", () => {
    expect(isoWeekday("2026-11-02")).toBe(1);
    expect(isoWeekday("2026-11-01")).toBe(7);
  });
});

describe("addDays", () => {
  it("crosses the US daylight-saving change without skipping a day", () => {
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
    expect(addDays("2026-11-01", 1)).toBe("2026-11-02");
  });

  it("crosses month and year boundaries", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });
});
