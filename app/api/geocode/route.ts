import { getLocationByCoordinates, searchLocations } from "@/api/location";
import { parseCoordinates } from "@/app/api/_lib/params";
import { NextRequest, NextResponse } from "next/server";

const CACHE_HEADER = "public, s-maxage=86400, stale-while-revalidate=3600";

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q");

  try {
    if (query !== null) {
      const results = await searchLocations(query);

      return NextResponse.json(results, { headers: { "Cache-Control": CACHE_HEADER } });
    }

    const coordinates = parseCoordinates(searchParams);

    if (!coordinates) {
      return NextResponse.json(
        { error: "Provide either a 'q' query parameter or valid 'lat' and 'lon' parameters" },
        { status: 400 },
      );
    }

    const location = await getLocationByCoordinates(coordinates.lat, coordinates.lon);

    return NextResponse.json(location, { headers: { "Cache-Control": CACHE_HEADER } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to resolve location";
    const status = message === "Location not found" ? 404 : 502;

    return NextResponse.json({ error: message }, { status });
  }
};
