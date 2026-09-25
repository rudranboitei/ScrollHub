"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { Check, Copy, ExternalLink, Heart } from "lucide-react";
import type { MediaSite } from "@/data/mediaData";
import { cn } from "@/lib/utils";

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
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(site.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be unavailable outside secure contexts.
    }
  };

  return (
    <article className="group flex flex-col rounded-2xl border border-black/5 bg-white p-4 transition-colors hover:bg-black/[0.02]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/5 bg-black/[0.03] p-1.5">
            {!imageError ? (
              <Image
                src={`https://www.google.com/s2/favicons?domain=${site.domain}&sz=64`}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-lg" aria-hidden="true">
                {site.categoryIcon}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-bold tracking-tight text-black">
              {site.name}
            </h3>
            <p className="mt-0.5 truncate text-xs text-black/35">
              {site.domain}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(site.id)}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 active:scale-[0.97]",
            isFavorite
              ? "border-black bg-black text-white"
              : "border-black/5 bg-black/[0.03] text-black/45 hover:bg-black/[0.06] hover:text-black",
          )}
          aria-label={isFavorite ? `Remove ${site.name} from saved sites` : `Save ${site.name}`}
          title={isFavorite ? "Remove from saved" : "Save site"}
        >
          <Heart className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
        </button>
      </div>

      <div className="mt-5 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-black/45">
          <button
            type="button"
            onClick={() => onSelectCategory?.(site.category)}
            className="font-semibold text-black/65 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
          >
            {site.categoryName}
          </button>
          {site.subcategory !== "All" && (
            <>
              <span className="text-black/20">/</span>
              <span>{site.subcategory}</span>
            </>
          )}
        </div>

        {site.notes && (
          <p className="mt-3 rounded-xl bg-black/[0.035] px-3 py-2 text-xs leading-5 text-black/55">
            {site.notes}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-full bg-black px-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.01] hover:bg-black/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 active:scale-[0.98]"
        >
          Open site
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-black/[0.03] text-black/45 transition-all duration-200 hover:bg-black/[0.06] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
          aria-label={copied ? "Link copied" : `Copy link to ${site.name}`}
          title="Copy link"
        >
          {copied ? (
            <Check className="h-4 w-4 text-black" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </article>
  );
}
