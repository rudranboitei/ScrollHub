"use client"

import React from "react"
import Link from "next/link"
import {
  Film,
  Sparkles,
  Heart,
  Shield,
  Shuffle,
  Compass,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onRandomPick: () => void;
  onSelectCategory: (slug: string) => void;
  totalSites: number;
}

export function Navbar({
  favoritesCount,
  onOpenFavorites,
  onRandomPick,
  onSelectCategory,
  totalSites,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault()
              onSelectCategory("all")
            }}
            className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 via-indigo-600 to-amber-500 p-[1px] shadow-lg shadow-rose-500/10">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-zinc-950 transition-colors group-hover:bg-zinc-900">
                <Compass className="h-5 w-5 text-rose-400 transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-lg">
                  AHOY<span className="text-rose-500">INDEX</span>
                </span>
                <span className="rounded bg-rose-500/10 px-1.5 py-0.2 text-[10px] font-bold text-rose-400 border border-rose-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] font-medium text-zinc-400 hidden sm:block">
                Seven Seas Media Directory
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-white/10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {totalSites} Verified Portals
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Random Roll Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRandomPick}
            className="border-white/10 bg-zinc-900/60 text-zinc-200 hover:border-amber-500/40 hover:text-amber-300 hover:bg-amber-500/10 gap-1.5"
            title="Pick a random streaming source"
          >
            <Shuffle className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline text-xs font-semibold">Random Pick</span>
          </Button>

          {/* Favorites Stash Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFavorites}
            className="border-white/10 bg-zinc-900/60 text-zinc-200 hover:border-rose-500/40 hover:text-rose-300 hover:bg-rose-500/10 gap-1.5 relative"
            title="Saved sources"
          >
            <Heart className={`h-3.5 w-3.5 ${favoritesCount > 0 ? "fill-rose-500 text-rose-500" : "text-zinc-400"}`} />
            <span className="hidden sm:inline text-xs font-semibold">Saved Stash</span>
            {favoritesCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Button>

          {/* Quick Safety Link */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectCategory("vpn")}
            className="text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/10 gap-1.5 hidden sm:flex text-xs"
          >
            <Shield className="h-3.5 w-3.5 text-cyan-400" />
            <span>VPN & AdBlock</span>
          </Button>

          {/* Community Links */}
          <a
            href="https://github.com/yarrlist/AhoyList"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/20 hover:text-white transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
