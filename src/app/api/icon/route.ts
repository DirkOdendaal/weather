import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * Gets the icon for a given icon id.
 * @param request the request object and query parameters.
 * @returns the icon.
 */
const handler = async (request: NextRequest): Promise<NextResponse> => {
  if (request.method !== "GET") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  const iconId = request.nextUrl.searchParams.get("iconId");
  if (!iconId) {
    return new NextResponse("Bad Request: iconId required", { status: 400 });
  }

  const url = new URL(`${process.env.OPEN_WEATHER_BASE_URL}/img/wn/${iconId}@4x.png`);

  const response = await axios.get(url.toString());

  return new NextResponse(response.data, { status: 200 });
};

export { handler as GET };

