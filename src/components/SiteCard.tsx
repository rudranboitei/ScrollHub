"use client"

import React, { useState } from "react"
import { ExternalLink, Copy, Check, Heart, Shield, Sparkles, Globe } from "lucide-react"
import { MediaSite } from "@/data/mediaData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SiteCardProps {
  site: MediaSite;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectCategory?: (slug: string) => void;
}

export function SiteCard({
  site,
  isFavorite,
  onToggleFavorite,
  onSelectCategory,
}: SiteCardProps) {
  const [copied, setCopied] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(site.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${site.domain}&sz=64`

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/60 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-zinc-900/90 hover:shadow-2xl hover:shadow-rose-500/5">
      {/* Subtle top glow highlight */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-rose-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-30" />

      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3">
          {/* Favicon & Name */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 p-1.5 shadow-inner">
              {!imgError ? (
                <img
                  src={faviconUrl}
                  alt={`${site.name} logo`}
                  className="h-6 w-6 rounded object-contain"
                  onError={() => setImgError(true)}
                  loading="lazy"
                />
              ) : (
                <span className="text-lg">{site.categoryIcon}</span>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                {site.name}
              </h3>
              <p className="truncate font-mono text-xs text-zinc-400">
                {site.domain}
              </p>
            </div>
          </div>

          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(site.id)}
            aria-label={isFavorite ? "Remove from saved stash" : "Save to stash"}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all",
              isFavorite
                ? "border-rose-500/50 bg-rose-500/20 text-rose-400"
                : "border-white/10 bg-zinc-950/60 text-zinc-400 hover:border-white/20 hover:text-white"
            )}
            title={isFavorite ? "Saved in stash" : "Add to stash"}
          >
            <Heart
              className={cn("h-4 w-4", isFavorite ? "fill-rose-500 text-rose-500" : "")}
            />
          </button>
        </div>

        {/* Notes or Subcategory Pill */}
        {(site.notes || (site.subcategory && site.subcategory !== "All")) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {site.notes && (
              <span className="inline-flex items-center rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                ⚡ {site.notes}
              </span>
            )}
            {site.subcategory && site.subcategory !== "All" && (
              <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                📂 {site.subcategory}
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectCategory && onSelectCategory(site.category)}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span>{site.categoryIcon}</span>
            <span>{site.categoryName}</span>
          </button>

          {site.tags?.map((t) => (
            <span
              key={t}
              className="rounded-md bg-zinc-950/80 px-2 py-0.5 text-[10px] text-zinc-400 border border-white/[0.04]"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-5 flex items-center gap-2 border-t border-white/[0.08] pt-3.5">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-medium py-2 px-3 text-xs shadow-md shadow-rose-600/20 transition-all active:scale-[0.98]"
        >
          <span>Launch Portal</span>
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>

        <button
          onClick={handleCopy}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-950/80 text-zinc-400 hover:border-white/20 hover:text-white transition-colors"
          title="Copy link to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}
