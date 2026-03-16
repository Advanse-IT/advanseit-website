/**
 * ReadingProgress
 *
 * A thin fixed bar at the very top of the viewport that fills from left to
 * right as the user scrolls through the page. Uses the article element
 * (or the full document height if no article is found) as the scroll range.
 *
 * Mount this at the top of any long-form content page (e.g. BlogPost).
 */

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress(); // initialise on mount
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-[#00C8D4] transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
