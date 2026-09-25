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
  description: string;
  count: number;
  subcategories: string[];
}

import mediaDataRaw from "./mediaData.json";

export const CATEGORIES: MediaCategory[] = mediaDataRaw.categories;
export const ALL_MEDIA_SITES: MediaSite[] = mediaDataRaw.allItems;
