import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateString) {
  const now = new Date();
  const created = new Date(dateString);
  const diff = Math.floor((now - created) / 1000); // seconds

  if (diff < 60) return `${diff}s`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "1d";
  if (days < 7) return `${days}d`;

  // fallback to date after a week
  return created.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: now.getFullYear() !== created.getFullYear() ? "numeric" : undefined,
  });
}