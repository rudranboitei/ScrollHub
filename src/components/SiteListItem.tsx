"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { Check, Copy, ExternalLink, Heart } from "lucide-react";
import type { MediaSite } from "@/data/mediaData";
import { cn } from "@/lib/utils";

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
    <article className="group flex items-center justify-between gap-3 rounded-full border border-black/5 bg-white py-2 pl-2 pr-2.5 transition-colors hover:bg-black/[0.02] sm:gap-4 sm:py-2.5 sm:pl-3 sm:pr-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/5 bg-black/[0.03] p-1.5">
          {!imageError ? (
            <Image
              src={`https://www.google.com/s2/favicons?domain=${site.domain}&sz=32`}
              alt=""
              width={16}
              height={16}
              className="h-4 w-4 object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <span aria-hidden="true">{site.categoryIcon}</span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="truncate text-sm font-bold tracking-tight text-black">
              {site.name}
            </h3>
            {site.notes && (
              <span className="hidden shrink-0 text-[10px] text-black/35 lg:inline">
                {site.notes}
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-[10px] text-black/35">
            {site.domain}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelectCategory?.(site.category)}
        className="hidden max-w-40 truncate rounded-full px-3 py-1.5 text-xs font-semibold text-black/45 transition-colors hover:bg-black/[0.05] hover:text-black focus-visible:outline-2 focus-visible:outline-black/30 md:block"
        title={`Browse ${site.categoryName}`}
      >
        {site.categoryName}
      </button>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black/[0.05] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
          aria-label={copied ? "Link copied" : `Copy link to ${site.name}`}
          title="Copy link"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-black" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onToggleFavorite(site.id)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30",
            isFavorite
              ? "bg-black text-white"
              : "text-black/40 hover:bg-black/[0.05] hover:text-black",
          )}
          aria-label={isFavorite ? `Remove ${site.name} from saved sites` : `Save ${site.name}`}
          title={isFavorite ? "Remove from saved" : "Save site"}
        >
          <Heart className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
        </button>

        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-black px-3 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-black/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
        >
          <span className="hidden sm:inline">Visit</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
