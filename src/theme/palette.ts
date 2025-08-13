export const COLORS = {
  bg: "#0f0f12",
  panel: "#17171c",
  panel2: "#1f1f26",
  border: "#27272f",
  text: "#f5f6f7",
  muted: "#9aa0a6",
  brand: "#f4c430",
  brand2: "#5f46f1",
  success: "#31c48d",
} as const;

export type ColorKey = keyof typeof COLORS;
