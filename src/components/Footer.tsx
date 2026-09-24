"use client"

import React from "react"
import Link from "next/link"
import { Compass, Shield, Heart } from "lucide-react"

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

interface FooterProps {
  onSelectCategory: (slug: string) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950/90 pt-12 pb-8 mt-16 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.06]">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-sm">
                AHOY<span className="text-rose-500">INDEX</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Curated master directory for free internet streaming, torrents, anime, sports, manga, and privacy tools.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/yarrlist/AhoyList"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                title="GitHub Repo"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://reddit.com/r/ahoylistnet/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose-400 transition-colors font-medium text-[11px]"
              >
                r/ahoylistnet
              </a>
              <a
                href="https://piradex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors font-medium text-[11px]"
              >
                Piradex
              </a>
            </div>
          </div>

          {/* Col 2: Media Categories */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
              Entertainment
            </h4>
            <ul className="space-y-2">
              {["movies-tv", "anime", "asian-drama", "live-sports", "live-tv"].map((slug) => (
                <li key={slug}>
                  <button
                    onClick={() => onSelectCategory(slug)}
                    className="hover:text-rose-300 transition-colors capitalize text-left"
                  >
                    {slug.replace("-", " & ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Literature & Games */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
              Files &amp; Reading
            </h4>
            <ul className="space-y-2">
              {["manga", "comics", "ebooks", "games", "music", "torrents"].map((slug) => (
                <li key={slug}>
                  <button
                    onClick={() => onSelectCategory(slug)}
                    className="hover:text-rose-300 transition-colors capitalize text-left"
                  >
                    {slug}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Safety & Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">
              Safety &amp; Legal
            </h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              This index does not host, upload, or own any files or streams. All links are user-submitted indices to third-party public web services.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectCategory("vpn")}
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <Shield className="h-3 w-3" />
                <span>Equip AdBlockers &amp; VPN</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} AhoyIndex • Raw data extracted from AhoyList.</p>
          <p className="flex items-center gap-1">
            Built with <span>Tailwind CSS</span> &amp; <span>Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
