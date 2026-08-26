export type ProductGender = "masculine" | "feminine" | "unisex";

export type ProductCategory =
  | "full-bottle"
  | "decant"
  | "arabian"
  | "designer"
  | "niche"
  | "decant-set";

export type ProductType = "perfume" | "decant" | "set";

export type FragranceNotes = {
  top: string[];
  heart: string[];
  base: string[];
};

export type ProductSize = {
  label: string;
  volumeMl: number;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku?: string;
};

export type FragranceIntensity = 1 | 2 | 3 | 4 | 5;

export type Product = {
  id: string;
  name: string;
  brand: string;
  slug: string;
  description: string;
  gender: ProductGender;
  category: ProductCategory;
  type: ProductType;
  price: number;
  compareAtPrice?: number;
  images: string[];
  sizes: ProductSize[];
  notes: FragranceNotes;
  fragranceFamily: string[];
  occasions: string[];
  intensity?: FragranceIntensity;
  intensityScore?: number;
  projection?: string;
  longevity?: string;
  seoTitle?: string;
  seoDescription?: string;
  rating?: number;
  ratingCount?: number;
  featured: boolean;
  bestseller: boolean;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductSort =
  | "recommended"
  | "bestsellers"
  | "newest"
  | "price-asc"
  | "price-desc";

export type ProductFilters = {
  category?: ProductCategory;
  gender?: ProductGender;
  type?: ProductType;
  featured?: boolean;
  bestseller?: boolean;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  fragranceFamily?: string;
  occasion?: string;
  size?: number;
};

export type CatalogQuery = ProductFilters & {
  query?: string;
  sort?: ProductSort;
};

export type ProductSearchSuggestion = {
  id: string;
  name: string;
  brand: string;
  slug: string;
  image?: string;
  type: ProductType;
};

export type CatalogFacets = {
  genders: ProductGender[];
  brands: string[];
  types: ProductType[];
  categories: ProductCategory[];
  families: string[];
  occasions: string[];
  sizes: number[];
  priceRange: {
    min: number;
    max: number;
  };
};

export type CatalogResult = {
  products: Product[];
  total: number;
  facets: CatalogFacets;
};
