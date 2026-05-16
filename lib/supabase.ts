import { createClient } from "@supabase/supabase-js";

// Client-side Supabase (untuk fetch data portfolio, dll)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Tipe data untuk project portfolio
export type Project = {
  id: string;
  title: string;
  category: "branding" | "socmed" | "uiux";
  description: string;
  image_url: string;
  created_at: string;
  is_featured: boolean;
  order_index: number;
};

export type Category = "all" | "branding" | "socmed" | "uiux";

export const CATEGORY_LABELS: Record<string, string> = {
  all: "Semua",
  branding: "Branding",
  socmed: "Social Media Kit",
  uiux: "UI/UX",
};
