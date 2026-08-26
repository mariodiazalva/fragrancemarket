import { NextRequest } from "next/server";

import { getProducts } from "@/services/product.service";
import {
  SEARCH_SUGGESTION_LIMIT,
  suggestProducts,
  toSearchSuggestion,
} from "@/services/search.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const parsedLimit = Number(
    request.nextUrl.searchParams.get("limit") ?? SEARCH_SUGGESTION_LIMIT,
  );
  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), SEARCH_SUGGESTION_LIMIT)
    : SEARCH_SUGGESTION_LIMIT;

  const products = suggestProducts(await getProducts(), query, limit);

  return Response.json(products.map(toSearchSuggestion));
}
