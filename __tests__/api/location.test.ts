import { getLocationByCoordinates, searchLocations } from "@/api/location";
import axios from "axios";

describe("searchLocations", () => {
  it("should map geocoding results to locations", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: [
        { name: "London", lat: 51.5074, lon: -0.1278, country: "GB", state: "England" },
        { name: "London", lat: 42.9834, lon: -81.233, country: "CA", state: "Ontario" },
      ],
    } as any);

    const locations = await searchLocations("London");

    expect(locations).toEqual([
      { name: "London", lat: 51.5074, lon: -0.1278, country: "GB", state: "England" },
      { name: "London", lat: 42.9834, lon: -81.233, country: "CA", state: "Ontario" },
    ]);
  });

  it("should drop duplicate records with the same name/state/country", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: [
        { name: "The Hague", lat: 52.0799838, lon: 4.3113461, country: "NL", state: "South Holland" },
        { name: "The Hague", lat: 52.0799838, lon: 4.3113461, country: "NL", state: "South Holland" },
        { name: "Paris", lat: 48.8589, lon: 2.32, country: "FR", state: "Ile-de-France" },
        { name: "Paris", lat: 48.8535, lon: 2.3484, country: "FR", state: "Ile-de-France" },
      ],
    } as any);

    const locations = await searchLocations("The Hague");

    expect(locations).toEqual([
      { name: "The Hague", lat: 52.0799838, lon: 4.3113461, country: "NL", state: "South Holland" },
      { name: "Paris", lat: 48.8589, lon: 2.32, country: "FR", state: "Ile-de-France" },
    ]);
  });

  it("should cap the result list at five entries", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: Array.from({ length: 8 }, (_, index) => ({
        name: `City ${index}`,
        lat: index,
        lon: index,
        country: "US",
      })),
    } as any);

    const locations = await searchLocations("City");

    expect(locations).toHaveLength(5);
  });

  it("should return an empty array without calling the API for a blank query", async () => {
    const getSpy = jest.spyOn(axios, "get");

    const locations = await searchLocations("   ");

    expect(locations).toEqual([]);
    expect(getSpy).not.toHaveBeenCalled();
  });
});

describe("getLocationByCoordinates", () => {
  it("should return the first reverse-geocoded location", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: [{ name: "Amsterdam", lat: 52.3676, lon: 4.9041, country: "NL", state: "North Holland" }],
    } as any);

    const location = await getLocationByCoordinates(52.3676, 4.9041);

    expect(location).toEqual({
      name: "Amsterdam",
      lat: 52.3676,
      lon: 4.9041,
      country: "NL",
      state: "North Holland",
    });
  });

  it("should throw when no location matches the coordinates", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] } as any);

    await expect(getLocationByCoordinates(0, 0)).rejects.toThrow("Location not found");
  });
});
