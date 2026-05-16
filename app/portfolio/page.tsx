import PublicLayout from "@/components/layout/PublicLayout";
import PortfolioClient from "@/components/ui/PortfolioClient";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/supabase";

async function getAllProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export const revalidate = 60; // Revalidate setiap 60 detik

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <PublicLayout>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-[12px] tracking-[2px] uppercase text-accent font-medium mb-3">
          KaryaDarma Putri Saya
          </p>
          <h1 className="text-[36px] font-semibold tracking-tight text-ink">
            Portfolio
          </h1>
          <p className="text-[14px] text-muted mt-2">
            Klik kategori untuk filter project yang ingin kamu lihat.
          </p>
        </div>

        <PortfolioClient projects={projects} />
      </section>
    </PublicLayout>
  );
}
