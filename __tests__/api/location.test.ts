import { getLocationByCityName } from "@/api/location";
import axios from "axios";

describe("Location API", () => {
	it("should fetch location by city name", async () => {
		const mockCityName = "London";
		const mockLocationData = {
			name: "London",
			country: "GB",
			lat: 51.5074,
			lon: -0.1278,
		};

		// Mock the axios.get method
		jest.spyOn(axios, "get").mockResolvedValue({
			data: [mockLocationData],
		} as any);

		const location = await getLocationByCityName(mockCityName);

		expect(location).toEqual(mockLocationData);
	});

	it("should throw an error if location not found", async () => {
		const mockCityName = "NonExistentCity";

		jest.spyOn(axios, "get").mockResolvedValue({
			data: [],
		} as any);

		await expect(getLocationByCityName(mockCityName)).rejects.toThrow("Location not found");
	});
});
