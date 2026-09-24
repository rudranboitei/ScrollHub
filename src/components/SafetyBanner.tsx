"use client"

import React, { useState } from "react"
import { ShieldAlert, ShieldCheck, Ban, ArrowRight, X } from "lucide-react"

interface SafetyBannerProps {
  onSelectCategory: (slug: string) => void;
}

export function SafetyBanner({ onSelectCategory }: SafetyBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5">
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden rounded-xl border border-amber-500/25 bg-gradient-to-r from-amber-950/40 via-zinc-900/60 to-zinc-900/40 p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-amber-200">
              Sailor&apos;s Safety Advisory
            </p>
            <p className="text-xs text-zinc-300">
              Free streaming and download sites often contain intrusive redirects. We strongly recommend equipping{" "}
              <button
                onClick={() => onSelectCategory("adblockers")}
                className="font-medium text-amber-300 underline underline-offset-2 hover:text-amber-100"
              >
                an AdBlocker (uBlock Origin / Brave)
              </button>{" "}
              and keeping a{" "}
              <button
                onClick={() => onSelectCategory("vpn")}
                className="font-medium text-amber-300 underline underline-offset-2 hover:text-amber-100"
              >
                VPN active
              </button>{" "}
              for private voyages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => onSelectCategory("adblockers")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all"
          >
            <Ban className="h-3.5 w-3.5" />
            <span>AdBlockers</span>
          </button>
          <button
            onClick={() => onSelectCategory("vpn")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>VPNs</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200 transition-colors ml-1"
            title="Dismiss advisory"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
