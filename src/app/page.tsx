"use client"

import React, { useState, useMemo } from "react"
import {
  CATEGORIES,
  ALL_MEDIA_SITES,
  MediaSite,
  MediaCategory,
  SITE_STATS,
} from "@/data/mediaData"
import { useFavorites } from "@/hooks/useFavorites"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { SafetyBanner } from "@/components/SafetyBanner"
import { CategoryNav } from "@/components/CategoryNav"
import { SiteCard } from "@/components/SiteCard"
import { SiteListItem } from "@/components/SiteListItem"
import { RandomPickerModal } from "@/components/RandomPickerModal"
import { Footer } from "@/components/Footer"
import {
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown,
  SlidersHorizontal,
  Flame,
  Search,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Shield,
  Heart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSubcategory, setActiveSubcategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"featured" | "popular" | "alpha">("featured")
  const [showNsfw, setShowNsfw] = useState(false)
  const [randomModalOpen, setRandomModalOpen] = useState(false)

  const { favorites, toggleFavorite, isFavorite, count: favoritesCount } =
    useFavorites()

  // Handler to switch categories and reset subcategory
  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug)
    setActiveSubcategory("All")
    // If user clicked category, scroll smoothly to list section
    const listSection = document.getElementById("content-section")
    if (listSection) {
      listSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Filtered categories (respecting NSFW toggle)
  const visibleCategories = useMemo(() => {
    return CATEGORIES.filter((c) => {
      if (c.slug === "adult" && !showNsfw) return false
      return true
    })
  }, [showNsfw])

  // Filtered items
  const filteredSites = useMemo(() => {
    let result = ALL_MEDIA_SITES

    // Filter NSFW unless enabled or specifically browsing adult
    if (!showNsfw && activeCategory !== "adult") {
      result = result.filter((s) => s.category !== "adult")
    }

    // Category filter
    if (activeCategory === "favorites") {
      result = result.filter((s) => favorites.includes(s.id))
    } else if (activeCategory !== "all") {
      result = result.filter((s) => s.category === activeCategory)
    }

    // Subcategory filter
    if (activeSubcategory !== "All") {
      result = result.filter((s) => s.subcategory === activeSubcategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter((s) => {
        return (
          s.name.toLowerCase().includes(q) ||
          s.domain.toLowerCase().includes(q) ||
          s.categoryName.toLowerCase().includes(q) ||
          (s.notes && s.notes.toLowerCase().includes(q)) ||
          (s.tags && s.tags.some((t) => t.toLowerCase().includes(q))) ||
          (s.subcategory && s.subcategory.toLowerCase().includes(q))
        )
      })
    }

    // Sorting
    const sorted = [...result]
    if (sortBy === "popular") {
      sorted.sort((a, b) => b.popularity - a.popularity)
    } else if (sortBy === "alpha") {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      // "featured"
      sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.popularity - a.popularity
      })
    }

    return sorted
  }, [
    activeCategory,
    activeSubcategory,
    searchQuery,
    sortBy,
    showNsfw,
    favorites,
  ])

  // Current category metadata
  const currentCategoryData = useMemo(() => {
    if (activeCategory === "all") return null
    if (activeCategory === "favorites") {
      return {
        name: "Saved Stash",
        icon: "★",
        description: "Your personalized collection of bookmarked media sources and streaming portals.",
        gradient: "from-rose-500 to-pink-500",
        count: favorites.length,
      }
    }
    return visibleCategories.find((c) => c.slug === activeCategory) || null
  }, [activeCategory, visibleCategories, favorites.length])

  // Featured top portals for quick jump
  const topFeaturedSites = useMemo(() => {
    return ALL_MEDIA_SITES.filter(
      (s) => s.featured && (showNsfw || s.category !== "adult")
    ).slice(0, 6)
  }, [showNsfw])

  const isBrowsingAllWithoutSearch =
    activeCategory === "all" && !searchQuery.trim()

  return (
    <div className="flex min-h-screen flex-col bg-[#08090d] text-zinc-100">
      {/* Navbar */}
      <Navbar
        favoritesCount={favoritesCount}
        onOpenFavorites={() => handleSelectCategory("favorites")}
        onRandomPick={() => setRandomModalOpen(true)}
        onSelectCategory={handleSelectCategory}
        totalSites={ALL_MEDIA_SITES.length}
      />

      {/* Hero */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalSites={ALL_MEDIA_SITES.length}
        totalCategories={visibleCategories.length}
        onSelectCategory={handleSelectCategory}
      />

      {/* Safety Notice Banner */}
      <SafetyBanner onSelectCategory={handleSelectCategory} />

      {/* Main Content Area */}
      <main
        id="content-section"
        className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      >
        {/* Category Navigation Bar */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-4 shadow-xl backdrop-blur-md">
          <CategoryNav
            categories={visibleCategories}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            activeSubcategory={activeSubcategory}
            onSelectSubcategory={setActiveSubcategory}
            favoritesCount={favoritesCount}
            totalSites={ALL_MEDIA_SITES.length}
          />
        </div>

        {/* Section Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          {/* Left: Active Section Info */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">
                {currentCategoryData ? currentCategoryData.icon : "🌐"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentCategoryData
                  ? currentCategoryData.name
                  : searchQuery.trim()
                  ? `Search: "${searchQuery}"`
                  : "All Streaming Portals"}
              </h2>
              <Badge variant="subtle" className="text-xs font-semibold">
                {filteredSites.length} {filteredSites.length === 1 ? "source" : "sources"}
              </Badge>
            </div>

            {currentCategoryData?.description && (
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                {currentCategoryData.description}
              </p>
            )}
          </div>

          {/* Right: Controls & Toggles */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Sort Dropdown */}
            <div className="flex items-center rounded-xl border border-white/10 bg-zinc-900/80 px-2.5 py-1 text-xs">
              <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400 mr-1.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-zinc-900 text-white">
                  Featured First
                </option>
                <option value="popular" className="bg-zinc-900 text-white">
                  Highest Rated
                </option>
                <option value="alpha" className="bg-zinc-900 text-white">
                  Alphabetical (A-Z)
                </option>
              </select>
            </div>

            {/* NSFW Toggle */}
            <button
              onClick={() => setShowNsfw((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-all ${
                showNsfw
                  ? "border-rose-500/50 bg-rose-500/15 text-rose-300"
                  : "border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
              title="Toggle adult / 18+ content"
            >
              <Flame className={`h-3.5 w-3.5 ${showNsfw ? "text-rose-400" : "text-zinc-500"}`} />
              <span>18+ Portals</span>
              <span className="text-[10px] opacity-75">{showNsfw ? "ON" : "OFF"}</span>
            </button>

            {/* View Mode Toggle: Grid vs List */}
            <div className="flex items-center rounded-xl border border-white/10 bg-zinc-900/80 p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Grid view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Compact list view"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* If browsing ALL and NO search query: Show Visual Category Hub first */}
        {isBrowsingAllWithoutSearch && (
          <div className="space-y-8">
            {/* Category Cards Overview Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                    Explore By Category
                  </h3>
                </div>
                <span className="text-xs text-zinc-400">
                  {visibleCategories.length} categories available
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {visibleCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-4 text-center backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-rose-500/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950/80 border border-white/10 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="mt-2.5 text-xs font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-1">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-medium text-zinc-400 mt-0.5">
                      {cat.count} sources
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Top Picks Row */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                  Popular &amp; High-Speed Picks
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topFeaturedSites.map((site) => (
                  <SiteCard
                    key={site.id}
                    site={site}
                    isFavorite={isFavorite(site.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelectCategory={handleSelectCategory}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* The Listing Grid / List */}
        {filteredSites.length > 0 ? (
          <div>
            {isBrowsingAllWithoutSearch && (
              <div className="flex items-center gap-2 mb-5 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                  All Portals &amp; Stream Directory ({filteredSites.length})
                </h3>
              </div>
            )}

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSites.map((site) => (
                  <SiteCard
                    key={site.id}
                    site={site}
                    isFavorite={isFavorite(site.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelectCategory={handleSelectCategory}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredSites.map((site) => (
                  <SiteListItem
                    key={site.id}
                    site={site}
                    isFavorite={isFavorite(site.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelectCategory={handleSelectCategory}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/60 p-12 text-center backdrop-blur-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-zinc-900 text-3xl shadow-inner mb-4">
              🏴‍☠️
            </div>
            <h3 className="text-lg font-bold text-white">No Portals Found</h3>
            <p className="mt-1 text-sm text-zinc-400 max-w-sm">
              {activeCategory === "favorites"
                ? "You haven't saved any sites to your stash yet. Click the heart icon on any portal to save it here!"
                : `No results matched "${searchQuery}". Try searching for another keyword or reset filters.`}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {searchQuery && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="border-white/10 text-zinc-200 hover:bg-white/10 gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Clear Search</span>
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => {
                  setActiveCategory("all")
                  setActiveSubcategory("All")
                  setSearchQuery("")
                }}
                className="bg-rose-600 hover:bg-rose-500 text-white font-medium gap-1.5"
              >
                <span>Browse All Portals</span>
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Random Picker Roulette Modal */}
      <RandomPickerModal
        isOpen={randomModalOpen}
        onClose={() => setRandomModalOpen(false)}
        sites={filteredSites.length > 0 ? filteredSites : ALL_MEDIA_SITES}
        isFavorite={false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />
    </div>
  )
}
