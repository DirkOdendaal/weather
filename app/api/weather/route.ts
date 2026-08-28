import { getWeatherByLocation } from "@/api/weather";
import { parseCoordinates, parseLanguage, parseUnits } from "@/app/api/_lib/params";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const coordinates = parseCoordinates(searchParams);

  if (!coordinates) {
    return NextResponse.json({ error: "Valid 'lat' and 'lon' query parameters are required" }, { status: 400 });
  }

  try {
    const weather = await getWeatherByLocation(
      { name: "", ...coordinates },
      parseLanguage(searchParams.get("lang")),
      parseUnits(searchParams.get("units")),
    );

    return NextResponse.json(weather, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 502 });
  }
};
