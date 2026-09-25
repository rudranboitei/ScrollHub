"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "scrollhub_favorites_v1";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        // This browser-only value must be restored after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavorites(parsed);
      }
    } catch {
      // Ignore invalid or unavailable browser storage.
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => {
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // The in-memory list still works when storage is unavailable.
      }

      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  };
}
