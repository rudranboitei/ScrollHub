"use client";

import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";

interface SafetyBannerProps {
  onSelectCategory: (slug: string) => void;
}

export function SafetyBanner({ onSelectCategory }: SafetyBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      className="mt-6 flex items-start gap-3 rounded-2xl border border-black/5 bg-black/[0.02] p-4"
      aria-label="Safety note"
    >
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-black/45" />
      <p className="flex-1 text-xs leading-5 text-black/55 sm:text-[13px]">
        <strong className="font-semibold text-black/75">Safety note:</strong>{" "}
        Third-party links can contain redirects or trackers. Use a reputable{" "}
        <button
          type="button"
          onClick={() => onSelectCategory("adblockers")}
          className="font-semibold text-black underline underline-offset-2 hover:text-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
        >
          ad blocker
        </button>{" "}
        and consider a{" "}
        <button
          type="button"
          onClick={() => onSelectCategory("vpn")}
          className="font-semibold text-black underline underline-offset-2 hover:text-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
        >
          VPN
        </button>
        .
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="rounded-full p-1.5 text-black/35 transition-colors hover:bg-black/5 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
        aria-label="Dismiss safety note"
      >
        <X className="h-4 w-4" />
      </button>
    </aside>
  );
}
