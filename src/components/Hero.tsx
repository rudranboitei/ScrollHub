"use client"

import React, { useRef, useEffect } from "react"
import { Search, X, Sparkles, ShieldCheck, Film, Zap, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalSites: number;
  totalCategories: number;
  onSelectCategory: (slug: string) => void;
}

export function Hero({
  searchQuery,
  setSearchQuery,
  totalSites,
  totalCategories,
  onSelectCategory,
}: HeroProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const quickPills = [
    { label: "Movies & TV", slug: "movies-tv", icon: "🎬" },
    { label: "Anime", slug: "anime", icon: "🍥" },
    { label: "Live Sports", slug: "live-sports", icon: "⚽" },
    { label: "Torrents", slug: "torrents", icon: "🧲" },
    { label: "eBooks", slug: "ebooks", icon: "📚" },
    { label: "VPN Tools", slug: "vpn", icon: "🛡️" },
  ]

  return (
    <div className="relative overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-12 border-b border-white/[0.06]">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-[700px] rounded-full bg-gradient-to-tr from-rose-500/10 via-indigo-500/10 to-teal-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-medium text-rose-300 backdrop-blur-md mb-6 shadow-sm shadow-rose-500/10 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-rose-400 animate-spin-slow" />
          <span>Curated Media &amp; Streaming Index • {totalSites} Active Sources</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-sans">
          Stream Everything.{" "}
          <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300 bg-clip-text text-transparent">
            No Fluff, No Slop.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          The definitive index extracted straight from the seven seas. Movies, anime, sports streams,
          manga, books, games, and essential privacy tools — all clean, organized, and hand-verified.
        </p>

        {/* Search input container */}
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="group relative flex items-center rounded-2xl border border-white/15 bg-zinc-900/80 p-1.5 shadow-2xl backdrop-blur-xl transition-all focus-within:border-rose-500/60 focus-within:ring-4 focus-within:ring-rose-500/15">
            <div className="pl-3 text-zinc-400 group-focus-within:text-rose-400 transition-colors">
              <Search className="h-5 w-5" />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by site name, category, domain, or tag (e.g. soap2night, anime, 1337x, vpn)..."
              className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:outline-none"
            />

            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 pr-3 text-[11px] font-semibold text-zinc-500">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">⌘</kbd>
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">K</kbd>
              </div>
            )}
          </div>

          {/* Quick filter pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-zinc-500 font-medium mr-1">Quick jumps:</span>
            {quickPills.map((pill) => (
              <button
                key={pill.slug}
                onClick={() => onSelectCategory(pill.slug)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1 text-zinc-300 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all text-xs"
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
