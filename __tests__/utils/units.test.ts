import { Units } from "@/enums/unit";
import { formatWindSpeed } from "@/utils/units";

describe("formatWindSpeed", () => {
  it("converts m/s to km/h for metric units", () => {
    expect(formatWindSpeed(6.17, Units.Metric)).toBe("22 km/h");
  });

  it("converts m/s to km/h for standard units", () => {
    expect(formatWindSpeed(10, Units.Standard)).toBe("36 km/h");
  });

  it("keeps mph for imperial units", () => {
    expect(formatWindSpeed(13.8, Units.Imperial)).toBe("14 mph");
  });
});
