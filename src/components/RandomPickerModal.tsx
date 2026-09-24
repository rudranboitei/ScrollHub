"use client"

import React, { useState, useEffect } from "react"
import { X, Sparkles, ExternalLink, Shuffle, Heart, Shield } from "lucide-react"
import { MediaSite } from "@/data/mediaData"
import { Button } from "@/components/ui/button"

interface RandomPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sites: MediaSite[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function RandomPickerModal({
  isOpen,
  onClose,
  sites,
  isFavorite,
  onToggleFavorite,
}: RandomPickerModalProps) {
  const [selectedSite, setSelectedSite] = useState<MediaSite | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const pickRandom = () => {
    if (!sites || sites.length === 0) return
    setIsSpinning(true)
    let count = 0
    const interval = setInterval(() => {
      const rand = sites[Math.floor(Math.random() * sites.length)]
      setSelectedSite(rand)
      count++
      if (count >= 12) {
        clearInterval(interval)
        setIsSpinning(false)
      }
    }, 60)
  }

  useEffect(() => {
    if (isOpen) {
      pickRandom()
    }
  }, [isOpen])

  if (!isOpen || !selectedSite) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 p-6 shadow-2xl">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Sailor&apos;s Lucky Roll</h3>
            <p className="text-xs text-zinc-400">Randomly selected streaming destination</p>
          </div>
        </div>

        {/* Selected Result Box */}
        <div className={`my-5 rounded-xl border border-white/10 bg-zinc-900/80 p-5 text-center transition-all ${isSpinning ? "scale-[0.98] opacity-70" : "scale-100 opacity-100"}`}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-zinc-950 text-2xl shadow-inner mb-3">
            {selectedSite.categoryIcon}
          </div>

          <h4 className="text-xl font-bold text-white tracking-tight">
            {selectedSite.name}
          </h4>
          <p className="font-mono text-xs text-rose-400 mt-1">
            {selectedSite.domain}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
            <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-zinc-300">
              {selectedSite.categoryName}
            </span>
            {selectedSite.subcategory && selectedSite.subcategory !== "All" && (
              <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-zinc-300">
                {selectedSite.subcategory}
              </span>
            )}
            {selectedSite.notes && (
              <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-xs text-amber-300 font-medium">
                ⚡ {selectedSite.notes}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 mt-5">
          <a
            href={selectedSite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold py-2.5 px-4 text-sm shadow-lg shadow-rose-600/30 transition-all"
          >
            <span>Launch Stream Now</span>
            <ExternalLink className="h-4 w-4" />
          </a>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={pickRandom}
              disabled={isSpinning}
              className="flex-1 border-white/10 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 text-xs"
            >
              <Shuffle className={`h-3.5 w-3.5 ${isSpinning ? "animate-spin" : ""}`} />
              <span>Roll Another</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => onToggleFavorite(selectedSite.id)}
              className="border-white/10 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 text-xs"
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
              <span>{isFavorite ? "Saved" : "Save Stash"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
