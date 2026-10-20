import type { CollectionEntry } from "astro:content";

// Wix serves resized, modern-format images from the same media URL via a /v1/fill/ transform.
export function coverUrl(cover: string, width: number, height: number) {
  return `${cover}/v1/fill/w_${width},h_${height},al_c,q_80,enc_auto/cover.jpg`;
}

export function readingMinutes(post: CollectionEntry<"blog">) {
  const words = (post.body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

// Shared name lets the card image morph into the article hero during the cross-document view transition.
export function coverTransitionName(post: CollectionEntry<"blog">) {
  return `cover-${post.id}`;
}
