import { WeatherForecast } from "@/interfaces/WeatherForecast";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * Gets the weather forecast for a given location by lat and lon.
 * @param request the request object and query parameters.
 * @returns the weather forecast.
 */
const handler = async (request: NextRequest): Promise<NextResponse> => {
  if (request.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");
  if (!lat || !lon) {
    return new NextResponse("Bad Request: lat and lon required", { status: 400 });
  }

  const url = new URL(`${process.env.OPEN_WEATHER_BASE_URL}/data/2.5/forecast`);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lon", lon);
  url.searchParams.append("appid", process.env.OPEN_WEATHER_API_KEY as string);
  url.searchParams.append("units", "metric");

  const response = await axios.get<WeatherForecast>(url.toString());

  return new NextResponse(JSON.stringify(response.data), { status: 200 });
};

export { handler as GET };

