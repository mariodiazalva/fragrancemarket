import { NextRequest } from "next/server";

import { pickCartRecommendations, toRecommendationProduct } from "@/services/cart.service";
import { getProductCards } from "@/services/product.service";

export async function GET(request: NextRequest) {
  const exclude = request.nextUrl.searchParams.get("exclude")?.split(",").filter(Boolean) ?? [];
  const parsedLimit = Number(request.nextUrl.searchParams.get("limit") ?? 4);
  const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 8) : 4;
  const products = pickCartRecommendations(await getProductCards(), exclude, limit);

  return Response.json(products.map(toRecommendationProduct));
}
