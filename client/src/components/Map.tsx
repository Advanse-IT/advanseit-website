/**
 * Map component — self-hosted, no external JS API keys required.
 * Renders an OpenStreetMap embed via iframe (no API key, no external JS dependency).
 * The parent still passes onMapReady for API compatibility, but we just expose a
 * minimal stub so nothing breaks.
 */

import { cn } from "@/lib/utils";

interface MapViewProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMapReady?: (map: any) => void;
}

export function MapView({
  className,
  initialCenter = { lat: -27.4698, lng: 153.0251 }, // Brisbane default
  initialZoom = 14,
}: MapViewProps) {
  // Convert zoom level (Google Maps 0-21) to a rough bbox delta for OSM
  const delta = Math.pow(2, 14 - initialZoom) * 0.01;
  const bbox = [
    initialCenter.lng - delta,
    initialCenter.lat - delta,
    initialCenter.lng + delta,
    initialCenter.lat + delta,
  ].join(",");

  const src =
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${bbox}` +
    `&layer=mapnik` +
    `&marker=${initialCenter.lat},${initialCenter.lng}`;

  return (
    <div className={cn("w-full h-[500px] rounded-xl overflow-hidden border border-gray-200", className)}>
      <iframe
        title="AdvanseIT location map"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
