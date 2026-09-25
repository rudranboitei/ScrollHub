"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Heart, Shuffle, X } from "lucide-react";
import type { MediaSite } from "@/data/mediaData";
import { Button } from "@/components/ui/button";

interface RandomPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sites: MediaSite[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export function RandomPickerModal({
  isOpen,
  onClose,
  sites,
  isFavorite,
  onToggleFavorite,
}: RandomPickerModalProps) {
  if (!isOpen || sites.length === 0) return null;

  return (
    <RandomPickerDialog
      onClose={onClose}
      sites={sites}
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
    />
  );
}

function RandomPickerDialog({
  onClose,
  sites,
  isFavorite,
  onToggleFavorite,
}: Omit<RandomPickerModalProps, "isOpen">) {
  const [selectedSite, setSelectedSite] = useState<MediaSite>(() => {
    const index = Math.floor(Math.random() * sites.length);
    return sites[index];
  });

  const pickRandom = () => {
    const index = Math.floor(Math.random() * sites.length);
    setSelectedSite(sites[index]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const saved = isFavorite(selectedSite.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="random-picker-title"
        className="animate-modal-in w-full max-w-md rounded-3xl border border-black/5 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.14)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-black/35">Random pick</p>
            <h2
              id="random-picker-title"
              className="mt-1 text-lg font-bold tracking-tight text-black"
            >
              Try this one
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-black/40 transition-colors hover:bg-black/[0.05] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
            aria-label="Close random picker"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="my-6 rounded-2xl bg-black/[0.025] p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/5 bg-white text-2xl shadow-sm">
            <span aria-hidden="true">{selectedSite.categoryIcon}</span>
          </div>
          <h3 className="mt-4 text-xl font-bold tracking-tight text-black">
            {selectedSite.name}
          </h3>
          <p className="mt-1 text-xs text-black/35">{selectedSite.domain}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-semibold text-black/50">
              {selectedSite.categoryName}
            </span>
            {selectedSite.subcategory !== "All" && (
              <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-semibold text-black/50">
                {selectedSite.subcategory}
              </span>
            )}
          </div>
          {selectedSite.notes && (
            <p className="mx-auto mt-4 max-w-sm rounded-xl bg-white px-3 py-2 text-left text-xs leading-5 text-black/50">
              {selectedSite.notes}
            </p>
          )}
        </div>

        <div className="space-y-2.5">
          <a
            href={selectedSite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-black px-4 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.01] hover:bg-black/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
          >
            Open site
            <ExternalLink className="h-4 w-4" />
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={pickRandom}
              className="h-10"
            >
              <Shuffle className="h-3.5 w-3.5" />
              Pick another
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onToggleFavorite(selectedSite.id)}
              className="h-10"
            >
              <Heart className={saved ? "h-3.5 w-3.5 fill-black text-black" : "h-3.5 w-3.5"} />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
