/**
 * @jest-environment node
 */
import { GET } from "@/app/api/geocode/route";
import { getLocationByCoordinates, searchLocations } from "@/api/location";
import { NextRequest } from "next/server";

jest.mock("@/api/location");

const mockedSearchLocations = searchLocations as jest.MockedFunction<typeof searchLocations>;
const mockedGetLocationByCoordinates = getLocationByCoordinates as jest.MockedFunction<typeof getLocationByCoordinates>;

const call = (url: string) => GET(new NextRequest(new URL(url, "http://localhost")));

describe("GET /api/geocode", () => {
  it("returns search results for a 'q' query", async () => {
    mockedSearchLocations.mockResolvedValue([{ name: "Berlin", lat: 52.52, lon: 13.4, country: "DE" }]);

    const response = await call("/api/geocode?q=Berlin");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([{ name: "Berlin", lat: 52.52, lon: 13.4, country: "DE" }]);
    expect(mockedSearchLocations).toHaveBeenCalledWith("Berlin");
  });

  it("reverse geocodes when lat/lon are provided", async () => {
    mockedGetLocationByCoordinates.mockResolvedValue({ name: "Oslo", lat: 59.91, lon: 10.75, country: "NO" });

    const response = await call("/api/geocode?lat=59.91&lon=10.75");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ name: "Oslo", lat: 59.91, lon: 10.75, country: "NO" });
  });

  it("returns 400 when neither q nor coordinates are provided", async () => {
    const response = await call("/api/geocode");

    expect(response.status).toBe(400);
  });

  it("maps a 'Location not found' error to 404", async () => {
    mockedGetLocationByCoordinates.mockRejectedValue(new Error("Location not found"));

    const response = await call("/api/geocode?lat=0&lon=0");

    expect(response.status).toBe(404);
  });
});
