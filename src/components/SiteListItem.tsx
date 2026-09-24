"use client"

import React, { useState } from "react"
import { ExternalLink, Copy, Check, Heart } from "lucide-react"
import { MediaSite } from "@/data/mediaData"
import { cn } from "@/lib/utils"

interface SiteListItemProps {
  site: MediaSite;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectCategory?: (slug: string) => void;
}

export function SiteListItem({
  site,
  isFavorite,
  onToggleFavorite,
  onSelectCategory,
}: SiteListItemProps) {
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
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${site.domain}&sz=32`

  return (
    <div className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-zinc-900/80">
      {/* Left: Favicon + Name + Domain */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 p-1">
          {!imgError ? (
            <img
              src={faviconUrl}
              alt=""
              className="h-4 w-4 rounded object-contain"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <span className="text-sm">{site.categoryIcon}</span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-white group-hover:text-rose-300 transition-colors">
              {site.name}
            </span>

            {site.notes && (
              <span className="hidden sm:inline-flex items-center rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 text-[10px] font-medium text-amber-300 truncate">
                {site.notes}
              </span>
            )}
          </div>

          <p className="truncate font-mono text-xs text-zinc-400">
            {site.domain}
          </p>
        </div>
      </div>

      {/* Center: Category Badge */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={() => onSelectCategory && onSelectCategory(site.category)}
          className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-300 hover:text-white"
        >
          <span>{site.categoryIcon}</span>
          <span>{site.categoryName}</span>
        </button>

        {site.subcategory && site.subcategory !== "All" && (
          <span className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[11px] text-zinc-400">
            {site.subcategory}
          </span>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white transition-colors"
          title="Copy URL"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>

        <button
          onClick={() => onToggleFavorite(site.id)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border transition-all",
            isFavorite
              ? "border-rose-500/50 bg-rose-500/20 text-rose-400"
              : "border-white/10 bg-zinc-950/60 text-zinc-400 hover:text-white"
          )}
          title={isFavorite ? "Remove favorite" : "Add to favorites"}
        >
          <Heart
            className={cn("h-3.5 w-3.5", isFavorite ? "fill-rose-500 text-rose-500" : "")}
          />
        </button>

        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1.5 text-xs font-medium shadow-sm transition-all"
        >
          <span>Visit</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
