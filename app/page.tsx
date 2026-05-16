import Link from "next/link";
import Image from "next/image";
import PublicLayout from "@/components/layout/PublicLayout";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/supabase";

async function getFeaturedProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })
    .limit(3);
  return data ?? [];
}

const CATEGORY_COLORS: Record<string, string> = {
  branding: "bg-ink text-paper",
  socmed: "bg-accent text-white",
  uiux: "bg-[#2D5F8A] text-white",
};

const CATEGORY_LABELS: Record<string, string> = {
  branding: "Branding",
  socmed: "Social Media Kit",
  uiux: "UI/UX",
};

export default async function HomePage() {
  const featured = await getFeaturedProjects();

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-2xl">
          <p className="text-[12px] tracking-[2px] uppercase text-accent font-medium mb-5">
            Visual Designer & Brand Strategist
          </p>
          
          {/* PEMBUNGKUS UTAMA UNTUK EFEK ANIMASI MENGETIK */}
{/* PEMBUNGKUS EFEK ANIMASI MENGETIK 2 BARIS */}
          <div className="mb-8 flex flex-col items-start">
            
            {/* Baris 1: "Saya bantu brand" */}
            {/* PERBAIKAN: Mengganti inline-block menjadi w-fit */}
            <div className="w-fit overflow-hidden whitespace-nowrap animate-typing border-r-4 border-transparent pr-2">
              <h1 className="text-[40px] sm:text-[56px] font-poppins font-black leading-[1.1] tracking-[-1.5px] text-ink py-1">
                Saya bantu brand
              </h1>
            </div>
            
            {/* Baris 2: "bicara tanpa kata." */}
            {/* PERBAIKAN: Mengganti inline-block menjadi w-fit */}
            <div 
              className="w-fit overflow-hidden whitespace-nowrap animate-typing animate-blink border-r-0 border-ink pr-0"
              style={{ animationDelay: "3.5s", animationFillMode: "both" }}
            >
              <h1 className="text-[40px] sm:text-[56px] font-poppins font-black leading-[1.1] tracking-[-1.5px] text-ink py-1">
                bicara tanpa kata.
              </h1>
            </div>

          </div>

          <p className="text-[15px] leading-relaxed text-muted mb-10 max-w-[400px]">
            Spesialis branding, social media kit, dan UI/UX. Karya saya bicara
            lewat visual yang bersih, berkarakter, dan purposeful.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-dark transition-colors"
            >
              Lihat Portfolio →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-ink rounded-lg text-[13px] hover:bg-white transition-colors"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      {/* Featured Work */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          {/* PERBAIKAN: Mengembalikan teks judul seksi menjadi Karya Pilihan */}
          <p className="text-[11px] tracking-[1.5px] uppercase text-muted font-medium">
            Karya Pilihan
          </p>
          <Link
            href="/portfolio"
            className="text-[12px] text-accent hover:underline underline-offset-2"
          >
            Lihat semua →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.map((project, i) => (
              <Link
                key={project.id}
                href="/portfolio"
                className={`group border border-border rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200 animate-fade-up delay-${i + 1}`}
              >
                {/* Thumbnail */}
                <div className="relative h-[160px] overflow-hidden bg-ink">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className={`h-full flex items-center justify-center text-[28px] font-bold tracking-[-1px] text-white/80 ${CATEGORY_COLORS[project.category] ?? "bg-ink"}`}
                    >
                      {project.title.slice(0, 3).toUpperCase()}
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-4 bg-white">
                  <p className="text-[13px] font-medium text-ink">
                    {project.title}
                  </p>
                  <p className="text-[11px] text-accent mt-1 uppercase tracking-wide">
                    {CATEGORY_LABELS[project.category] ?? project.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Placeholder saat belum ada data
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Branding", "Social Media Kit", "UI/UX"].map((cat, i) => (
              <div
                key={cat}
                className={`border border-border rounded-xl overflow-hidden animate-fade-up delay-${i + 1}`}
              >
                <div className="h-[160px] bg-ink/5 flex items-center justify-center">
                  <span className="text-[11px] text-muted uppercase tracking-widest">
                    {cat}
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <div className="h-3 bg-ink/5 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-accent/20 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Strip */}
      <section className="bg-ink text-paper">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[18px] font-medium tracking-tight mb-1">
              Ada project menarik?
            </p>
            <p className="text-[13px] text-white/60">
              Saya terbuka untuk kolaborasi branding, desain, dan konsultasi visual.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-light transition-colors"
          >
            Mulai Ngobrol →
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}