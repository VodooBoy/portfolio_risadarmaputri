"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { Project, Category } from "@/lib/supabase";
import { CATEGORY_LABELS } from "@/lib/supabase";

const FILTERS: { value: Category; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "branding", label: "Branding" },
  { value: "socmed", label: "Social Media Kit" },
  { value: "uiux", label: "UI/UX" },
];

const THUMB_COLORS: Record<string, string> = {
  branding: "#1A1A1A",
  socmed: "#E07B39",
  uiux: "#2D5F8A",
};

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={clsx(
              "px-4 py-1.5 rounded-full text-[12px] border transition-all duration-150",
              active === f.value
                ? "bg-ink text-paper border-ink"
                : "border-border text-muted hover:text-ink hover:border-ink/30"
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-[12px] text-muted self-center">
          {filtered.length}Karya
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted text-[14px]">
          Belum adaKarya di kategori ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className={clsx(
                "group text-left border border-border rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200 bg-white animate-fade-up",
                `delay-${Math.min(i + 1, 6)}`
              )}
            >
              {/* Thumbnail */}
              <div className="relative h-[180px] overflow-hidden">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="h-full flex items-center justify-center text-[26px] font-bold text-white/80"
                    style={{
                      backgroundColor:
                        THUMB_COLORS[project.category] ?? "#1A1A1A",
                    }}
                  >
                    {project.title.slice(0, 3).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-[13px] font-medium text-ink">
                  {project.title}
                </p>
                <p className="text-[11px] text-accent mt-1 uppercase tracking-wide">
                  {CATEGORY_LABELS[project.category] ?? project.category}
                </p>
                {project.description && (
                  <p className="text-[12px] text-muted mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modal detail project */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-paper rounded-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-[240px] bg-ink">
              {selected.image_url ? (
                <Image
                  src={selected.image_url}
                  alt={selected.title}
                  fill
                  className="object-cover"
                  sizes="512px"
                />
              ) : (
                <div
                  className="h-full flex items-center justify-center text-[36px] font-bold text-white/80"
                  style={{
                    backgroundColor:
                      THUMB_COLORS[selected.category] ?? "#1A1A1A",
                  }}
                >
                  {selected.title.slice(0, 3).toUpperCase()}
                </div>
              )}
            </div>
            {/* Content */}
            <div className="p-6">
              <p className="text-[11px] text-accent uppercase tracking-widest mb-2">
                {CATEGORY_LABELS[selected.category]}
              </p>
              <h3 className="text-[20px] font-semibold tracking-tight mb-3">
                {selected.title}
              </h3>
              {selected.description && (
                <p className="text-[13px] text-muted leading-relaxed">
                  {selected.description}
                </p>
              )}
              <button
                onClick={() => setSelected(null)}
                className="mt-6 w-full py-2.5 border border-border rounded-lg text-[13px] text-muted hover:text-ink hover:border-ink/30 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
