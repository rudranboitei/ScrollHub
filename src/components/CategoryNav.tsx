"use client"

import React, { useRef } from "react"
import {
  Film,
  Tv,
  BookOpen,
  Trophy,
  Radio,
  Magnet,
  Gamepad2,
  Music,
  BookMarked,
  Zap,
  Clapperboard,
  ShieldCheck,
  Ban,
  Flame,
  LayoutGrid,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { MediaCategory } from "@/data/mediaData"
import { cn } from "@/lib/utils"

interface CategoryNavProps {
  categories: MediaCategory[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  activeSubcategory: string;
  onSelectSubcategory: (sub: string) => void;
  favoritesCount: number;
  totalSites: number;
}

export function CategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
  activeSubcategory,
  onSelectSubcategory,
  favoritesCount,
  totalSites,
}: CategoryNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Find currently active category config to see if it has subcategories
  const currentCategoryObj = categories.find((c) => c.slug === activeCategory)
  const hasSubcategories =
    currentCategoryObj && currentCategoryObj.subcategories.length > 1

  return (
    <div className="w-full space-y-3">
      {/* Primary Category Row with Scroll Controls */}
      <div className="relative group">
        {/* Left scroll shadow/button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-zinc-950/90 text-zinc-300 shadow-xl backdrop-blur-md hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* "All" button */}
          <button
            onClick={() => onSelectCategory("all")}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all border",
              activeCategory === "all"
                ? "border-rose-500/50 bg-rose-500/15 text-rose-300 shadow-md shadow-rose-500/10 ring-1 ring-rose-500/30"
                : "border-white/10 bg-zinc-900/60 text-zinc-300 hover:border-white/20 hover:bg-zinc-800/80 hover:text-white"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>All Sources</span>
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                activeCategory === "all"
                  ? "bg-rose-500/30 text-rose-200"
                  : "bg-white/10 text-zinc-400"
              )}
            >
              {totalSites}
            </span>
          </button>

          {/* Favorites filter tab */}
          <button
            onClick={() => onSelectCategory("favorites")}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all border",
              activeCategory === "favorites"
                ? "border-rose-500/60 bg-rose-500/20 text-rose-200 shadow-md shadow-rose-500/10 ring-1 ring-rose-500/30"
                : "border-white/10 bg-zinc-900/60 text-zinc-300 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
            )}
          >
            <Heart
              className={cn(
                "h-3.5 w-3.5",
                favoritesCount > 0 ? "fill-rose-500 text-rose-500" : "text-zinc-400"
              )}
            />
            <span>Saved Stash</span>
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                activeCategory === "favorites"
                  ? "bg-rose-500/40 text-white"
                  : "bg-white/10 text-zinc-400"
              )}
            >
              {favoritesCount}
            </span>
          </button>

          {/* Each Category */}
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all border",
                  isActive
                    ? "border-white/40 bg-zinc-800 text-white shadow-lg ring-1 ring-white/20"
                    : "border-white/10 bg-zinc-900/60 text-zinc-300 hover:border-white/20 hover:bg-zinc-800/80 hover:text-white"
                )}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-zinc-400"
                  )}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right scroll shadow/button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-zinc-950/90 text-zinc-300 shadow-xl backdrop-blur-md hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Subcategory Secondary Row if applicable */}
      {hasSubcategories && (
        <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 border-t border-white/[0.06] pt-2.5">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider pl-1 mr-1">
            Section:
          </span>
          {currentCategoryObj.subcategories.map((sub) => {
            const isSubActive = activeSubcategory === sub
            return (
              <button
                key={sub}
                onClick={() => onSelectSubcategory(sub)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-medium transition-all border",
                  isSubActive
                    ? "border-rose-500/50 bg-rose-500/20 text-rose-300"
                    : "border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                )}
              >
                {sub}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
