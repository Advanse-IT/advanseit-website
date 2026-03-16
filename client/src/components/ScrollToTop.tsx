/**
 * ScrollToTop
 *
 * Listens for wouter location changes and immediately scrolls the window
 * to (0, 0) whenever the pathname changes. This ensures every page
 * navigation — service pages, blog, legal pages, etc. — starts at the top.
 *
 * Mount this once inside <Router> in App.tsx.
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
