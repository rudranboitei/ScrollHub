"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ArrowUpRight,
  Flame,
  LayoutGrid,
  List,
  RotateCcw,
  SearchX,
} from "lucide-react";
import { ALL_MEDIA_SITES, CATEGORIES } from "@/data/mediaData";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { RandomPickerModal } from "@/components/RandomPickerModal";
import { SafetyBanner } from "@/components/SafetyBanner";
import { SiteCard } from "@/components/SiteCard";
import { SiteListItem } from "@/components/SiteListItem";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "popular" | "alpha";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showNsfw, setShowNsfw] = useState(false);
  const [randomModalOpen, setRandomModalOpen] = useState(false);

  const { favorites, toggleFavorite, isFavorite, count: favoritesCount } =
    useFavorites();

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    setActiveSubcategory("All");

    document.getElementById("content-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const visibleCategories = useMemo(
    () =>
      CATEGORIES.filter(
        (category) => showNsfw || category.slug !== "adult",
      ),
    [showNsfw],
  );

  const visibleTotalSites = useMemo(
    () =>
      showNsfw
        ? ALL_MEDIA_SITES.length
        : ALL_MEDIA_SITES.filter((site) => site.category !== "adult").length,
    [showNsfw],
  );

  const filteredSites = useMemo(() => {
    let result = ALL_MEDIA_SITES;

    if (!showNsfw) {
      result = result.filter((site) => site.category !== "adult");
    }

    if (activeCategory === "favorites") {
      result = result.filter((site) => favorites.includes(site.id));
    } else if (activeCategory !== "all") {
      result = result.filter((site) => site.category === activeCategory);
    }

    if (activeSubcategory !== "All") {
      result = result.filter(
        (site) => site.subcategory === activeSubcategory,
      );
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((site) =>
        [
          site.name,
          site.domain,
          site.categoryName,
          site.notes ?? "",
          site.subcategory,
          ...site.tags,
        ].some((value) => value.toLowerCase().includes(query)),
      );
    }

    const sorted = [...result];
    if (sortBy === "popular") {
      sorted.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "alpha") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.popularity - a.popularity;
      });
    }

    return sorted;
  }, [
    activeCategory,
    activeSubcategory,
    favorites,
    searchQuery,
    showNsfw,
    sortBy,
  ]);

  const currentCategory =
    activeCategory === "favorites"
      ? {
          name: "Saved sites",
          icon: "★",
          description:
            "Your bookmarked sources, stored only in this browser.",
        }
      : visibleCategories.find(
          (category) => category.slug === activeCategory,
        );

  const isBrowsingAll = activeCategory === "all" && !searchQuery.trim();
  const sectionTitle = currentCategory
    ? currentCategory.name
    : searchQuery.trim()
      ? `Results for “${searchQuery.trim()}”`
      : "All sites";

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalSites={ALL_MEDIA_SITES.length}
        totalCategories={CATEGORIES.length}
        onRandomPick={() => setRandomModalOpen(true)}
      />

      <main
        id="content-section"
        className="mx-auto w-full max-w-3xl flex-1 scroll-mt-8 px-6 sm:px-12"
      >
        <CategoryNav
          categories={visibleCategories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          activeSubcategory={activeSubcategory}
          onSelectSubcategory={setActiveSubcategory}
          favoritesCount={favoritesCount}
          totalSites={visibleTotalSites}
        />

        <SafetyBanner onSelectCategory={handleSelectCategory} />

        {isBrowsingAll && (
          <section
            className="animate-enter-delay-3 pt-12"
            aria-labelledby="category-directory-title"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-black/35">Directory</p>
                <h2
                  id="category-directory-title"
                  className="mt-1 text-xl font-bold tracking-tight text-black"
                >
                  Browse by category
                </h2>
              </div>
              <span className="text-xs text-black/35">
                {visibleCategories.length} collections
              </span>
            </div>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {visibleCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleSelectCategory(category.slug)}
                  className="group flex items-center gap-3 rounded-full border border-black/5 bg-black/[0.03] px-4 py-3 text-left transition-all duration-200 hover:scale-[1.01] hover:bg-black/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 active:scale-[0.99]"
                >
                  <span className="text-base" aria-hidden="true">
                    {category.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-black/75">
                    {category.name}
                  </span>
                  <span className="text-[11px] text-black/30">
                    {category.count}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-black/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
                </button>
              ))}
            </div>
          </section>
        )}

        <section className={cn("pt-12", !isBrowsingAll && "pt-4")}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                {currentCategory && (
                  <span className="text-lg" aria-hidden="true">
                    {currentCategory.icon}
                  </span>
                )}
                <h2 className="text-2xl font-bold tracking-tight text-black">
                  {sectionTitle}
                </h2>
                <span className="text-xs text-black/35">
                  {filteredSites.length}{" "}
                  {filteredSites.length === 1 ? "source" : "sources"}
                </span>
              </div>
              {currentCategory?.description && (
                <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
                  {currentCategory.description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.03] px-3 py-2 text-xs text-black/45">
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span className="sr-only">Sort sites</span>
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortOption)
                  }
                  className="bg-transparent font-semibold text-black/70 outline-none"
                  aria-label="Sort sites"
                >
                  <option value="featured">Featured first</option>
                  <option value="popular">Most popular</option>
                  <option value="alpha">A–Z</option>
                </select>
              </label>

              <button
                type="button"
                onClick={() => {
                  const nextValue = !showNsfw;
                  setShowNsfw(nextValue);
                  if (!nextValue && activeCategory === "adult") {
                    setActiveCategory("all");
                    setActiveSubcategory("All");
                  }
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30",
                  showNsfw
                    ? "border-black bg-black text-white"
                    : "border-black/5 bg-black/[0.03] text-black/55 hover:bg-black/[0.06] hover:text-black",
                )}
                aria-pressed={showNsfw}
              >
                <Flame className="h-3.5 w-3.5" />
                Show 18+
              </button>

              <div
                className="flex items-center rounded-full border border-black/5 bg-black/[0.03] p-1"
                role="group"
                aria-label="Choose site layout"
              >
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-black/30",
                    viewMode === "grid"
                      ? "bg-black text-white"
                      : "text-black/40 hover:text-black",
                  )}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-black/30",
                    viewMode === "list"
                      ? "bg-black text-white"
                      : "text-black/40 hover:text-black",
                  )}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {filteredSites.length > 0 ? (
            viewMode === "grid" ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
              <div className="mt-6 space-y-2">
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
            )
          ) : (
            <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-black/10 bg-black/[0.02] px-6 py-16 text-center">
              <SearchX className="h-7 w-7 text-black/30" />
              <h3 className="mt-4 text-lg font-bold tracking-tight">No sites found</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-black/45">
                {activeCategory === "favorites"
                  ? "Save a site with the bookmark button and it will appear here."
                  : `Nothing matched “${searchQuery.trim()}”. Try another search or reset the directory.`}
              </p>
              <Button
                type="button"
                className="mt-6"
                onClick={() => {
                  setSearchQuery("");
                  handleSelectCategory("all");
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset directory
              </Button>
            </div>
          )}
        </section>
      </main>

      <RandomPickerModal
        isOpen={randomModalOpen}
        onClose={() => setRandomModalOpen(false)}
        sites={filteredSites.length > 0 ? filteredSites : ALL_MEDIA_SITES}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      <Footer />
    </div>
  );
}
