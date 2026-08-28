/**
 * @jest-environment node
 */
import { GET } from "@/app/api/weather/route";
import { getWeatherByLocation } from "@/api/weather";
import { LanguageCodes } from "@/enums/languages-codes";
import { Units } from "@/enums/unit";
import { NextRequest } from "next/server";

jest.mock("@/api/weather");

const mockedGetWeatherByLocation = getWeatherByLocation as jest.MockedFunction<typeof getWeatherByLocation>;

const call = (url: string) => GET(new NextRequest(new URL(url, "http://localhost")));

describe("GET /api/weather", () => {
  it("passes parsed coordinates, language and units to the weather client", async () => {
    mockedGetWeatherByLocation.mockResolvedValue({ mock: true } as never);

    const response = await call("/api/weather?lat=51.5&lon=-0.12&lang=nl&units=imperial");

    expect(response.status).toBe(200);
    expect(mockedGetWeatherByLocation).toHaveBeenCalledWith(
      { name: "", lat: 51.5, lon: -0.12 },
      LanguageCodes.NL,
      Units.Imperial,
    );
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=600");
  });

  it("falls back to English/metric for unknown lang and units", async () => {
    mockedGetWeatherByLocation.mockResolvedValue({} as never);

    await call("/api/weather?lat=1&lon=2&lang=xx&units=parsecs");

    expect(mockedGetWeatherByLocation).toHaveBeenCalledWith(
      { name: "", lat: 1, lon: 2 },
      LanguageCodes.EN,
      Units.Metric,
    );
  });

  it("returns 400 when coordinates are missing or invalid", async () => {
    expect((await call("/api/weather")).status).toBe(400);
    expect((await call("/api/weather?lat=abc&lon=2")).status).toBe(400);
    expect((await call("/api/weather?lat=200&lon=2")).status).toBe(400);
  });

  it("returns 502 when the upstream weather call fails", async () => {
    mockedGetWeatherByLocation.mockRejectedValue(new Error("upstream down"));

    const response = await call("/api/weather?lat=1&lon=2");

    expect(response.status).toBe(502);
  });
});
