import { LanguageCodes } from "@/enums/languages-codes";
import { getFormattedDate } from "@/utils/utils";

describe("getFormattedDate", () => {
  // 2026-08-28T09:00:00Z
  const timestamp = Date.UTC(2026, 7, 28, 9, 0, 0) / 1000;

  it("formats a UTC timestamp in the requested time zone", () => {
    expect(getFormattedDate(timestamp, LanguageCodes.EN, "UTC")).toBe("Friday, Aug 28");
  });

  it("localises the output for Dutch", () => {
    expect(getFormattedDate(timestamp, LanguageCodes.NL, "UTC")).toBe("vrijdag 28 aug");
  });

  it("uses the day boundary of the given time zone, not UTC", () => {
    // 2026-08-28T01:00:00Z is still Aug 27 in Los Angeles (UTC-7 in summer).
    const justAfterMidnightUtc = Date.UTC(2026, 7, 28, 1, 0, 0) / 1000;

    expect(getFormattedDate(justAfterMidnightUtc, LanguageCodes.EN, "America/Los_Angeles")).toBe("Thursday, Aug 27");
  });
});
