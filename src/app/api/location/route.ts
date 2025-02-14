import { Location } from "@/interfaces/Location";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * Searches for a location by city name.
 * @param request the request object and query parameters.
 * @returns the city lat and lon.
 */
const handler = async (request: NextRequest): Promise<NextResponse> => {
  if (request.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
  const cityName = request.nextUrl.searchParams.get("cityName");

  if (!cityName) {
    return new NextResponse("Bad Request: City name required", { status: 400 });
  }

  const url = new URL(`${process.env.OPEN_WEATHER_BASE_URL}/geo/1.0/direct`);

  url.searchParams.append("q", cityName);
  url.searchParams.append("appid", process.env.OPEN_WEATHER_API_KEY as string);
  url.searchParams.append("limit", process.env.OPEN_WEATHER_API_LIMIT as string);

  const response = await axios.get<Array<Location>>(url.toString());

  return new NextResponse(JSON.stringify(response.data), { status: 200 });
};

export { handler as GET };

