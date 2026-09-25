"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Search, Shuffle, X } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalSites: number;
  totalCategories: number;
  onRandomPick: () => void;
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Hero({
  searchQuery,
  setSearchQuery,
  totalSites,
  totalCategories,
  onRandomPick,
}: HeroProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const browseDirectory = () => {
    document.getElementById("content-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-12 pb-20 sm:px-12 sm:pt-24 sm:pb-32">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mb-8 block text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black/30 sm:mb-12"
          aria-label="Back to top"
        >
          <svg
            aria-hidden="true"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-700 ease-out hover:rotate-90"
          >
            <path
              d="M12 2V22M2 12H22M4.92893 4.92893L19.0711 19.0711M4.92893 19.0711L19.0711 4.92893"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <header className="max-w-2xl animate-enter">
          <div className="animate-enter-delay-1 mb-10 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.03] px-2.5 py-1.5 transition-colors hover:bg-black/[0.05]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-sm text-white">
                ✳
              </span>
              <span className="text-xs font-bold text-black/80">ScrollHub</span>
              <span className="text-xs text-black/30">
                {totalSites} sites · {totalCategories} categories
              </span>
            </div>

            <a
              href="https://github.com/rudranboitei/ScrollHub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ScrollHub on GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-black/[0.03] text-black transition-colors hover:bg-black/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30"
            >
              <GithubIcon />
            </a>
          </div>

          <h1 className="text-[28px] font-bold leading-snug tracking-tight text-black sm:text-[36px]">
            Web &amp; Media Directory.
          </h1>
          <p className="mt-4 mb-10 max-w-[94%] text-[14px] leading-relaxed text-black/60 sm:text-[15px]">
            A searchable list of third-party streaming, reading, gaming,
            download, and privacy links. Choose a category or search by name,
            domain, or tag.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={browseDirectory}
              className="group flex items-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-black/80 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 active:scale-[0.98]"
            >
              Browse the index
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={onRandomPick}
              className="group flex items-center gap-2 rounded-full border border-black/5 bg-black/[0.03] px-6 py-3.5 text-sm font-semibold text-black/80 transition-all duration-200 hover:scale-[1.02] hover:bg-black/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/30 active:scale-[0.98]"
            >
              <Shuffle className="h-4 w-4 text-black/60 transition-colors group-hover:text-black" />
              Random pick
            </button>
          </div>

          <div className="mt-8">
            <label htmlFor="directory-search" className="sr-only">
              Search the directory
            </label>
            <div className="flex h-12 items-center rounded-full border border-black/5 bg-black/[0.03] px-4 transition-colors focus-within:border-black/15 focus-within:bg-black/[0.05]">
              <Search className="mr-3 h-4 w-4 shrink-0 text-black/40" />
              <input
                ref={searchInputRef}
                id="directory-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search a site, domain, or tag"
                className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-black/35 [&::-webkit-search-cancel-button]:hidden"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="ml-2 rounded-full p-1.5 text-black/40 transition-colors hover:bg-black/5 hover:text-black focus-visible:outline-2 focus-visible:outline-black/30"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="ml-3 hidden rounded-full border border-black/5 bg-white px-2.5 py-1 text-[10px] font-semibold text-black/35 sm:block">
                  Ctrl K
                </kbd>
              )}
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
