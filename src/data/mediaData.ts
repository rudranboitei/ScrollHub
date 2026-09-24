// Auto-generated from name.md data
export interface MediaSite {
  id: string;
  name: string;
  url: string;
  domain: string;
  category: string;
  categoryName: string;
  categoryIcon: string;
  subcategory: string;
  notes?: string;
  tags: string[];
  featured: boolean;
  popularity: number;
}

export interface MediaCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  lucide: string;
  description: string;
  gradient: string;
  borderGlow: string;
  count: number;
  subcategories: string[];
  items: MediaSite[];
}

import mediaDataRaw from "./mediaData.json";

export const CATEGORIES: MediaCategory[] = mediaDataRaw.categories;
export const ALL_MEDIA_SITES: MediaSite[] = mediaDataRaw.allItems;

export const CATEGORY_MAP = new Map<string, MediaCategory>(
  CATEGORIES.map((c) => [c.slug, c])
);

export const SITE_STATS = {
  totalCategories: CATEGORIES.length,
  totalSites: ALL_MEDIA_SITES.length,
  featuredSites: ALL_MEDIA_SITES.filter((s) => s.featured).length,
};
