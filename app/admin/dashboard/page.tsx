"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/supabase";
import toast from "react-hot-toast";
import clsx from "clsx";

type Section = "dashboard" | "upload" | "manage" | "settings";

const CATEGORY_LABELS: Record<string, string> = {
  branding: "Branding",
  socmed: "Social Media Kit",
  uiux: "UI/UX",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [section, setSection] = useState<Section>("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Edit state
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });
    setProjects(data ?? []);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLSelectElement).value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
    const isFeatured = (form.elements.namedItem("is_featured") as HTMLInputElement).checked;
    const file = fileRef.current?.files?.[0];

    let image_url = "";

    // Upload gambar ke Supabase Storage
    if (file) {
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(filename, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        toast.error("Gagal upload gambar: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(filename);
      image_url = urlData.publicUrl;
    }

    // Simpan ke database
    const maxOrder = projects.length > 0
      ? Math.max(...projects.map((p) => p.order_index)) + 1
      : 0;

    const { error } = await supabase.from("projects").insert([
      { title, category, description, image_url, is_featured: isFeatured, order_index: maxOrder },
    ]);

    if (error) {
      toast.error("Gagal menyimpan: " + error.message);
    } else {
      toast.success("Karya berhasil diupload! 🎉");
      form.reset();
      setPreviewUrl(null);
      fetchProjects();
      setSection("manage");
    }
    setUploading(false);
  }

  async function handleDelete(id: string, imageUrl: string) {
    if (!confirm("HapusaryaDarma Putri ini? Tindakan tidak bisa dibatalkan.")) return;

    // Hapus gambar dari storage
    if (imageUrl) {
      const filename = imageUrl.split("/").pop();
      if (filename) {
        await supabase.storage.from("portfolio-images").remove([filename]);
      }
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast.error("Gagal menghapus.");
    } else {
      toast.success("Karya dihapus.");
      fetchProjects();
    }
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingProject) return;

    const form = e.currentTarget;
    const title = (form.elements.namedItem("edit_title") as HTMLInputElement).value;
    const category = (form.elements.namedItem("edit_category") as HTMLSelectElement).value;
    const description = (form.elements.namedItem("edit_description") as HTMLTextAreaElement).value;
    const isFeatured = (form.elements.namedItem("edit_featured") as HTMLInputElement).checked;

    const { error } = await supabase
      .from("projects")
      .update({ title, category, description, is_featured: isFeatured })
      .eq("id", editingProject.id);

    if (error) {
      toast.error("Gagal mengupdate.");
    } else {
      toast.success("Karya berhasil diupdate!");
      setEditingProject(null);
      fetchProjects();
    }
  }

  const featured = projects.filter((p) => p.is_featured);

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "upload", label: "UploadaryaDarma Putri", icon: "➕" },
    { id: "manage", label: "KelolaaryaDarma Putri", icon: "🗂️" },
    { id: "settings", label: "Pengaturan", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-border flex flex-col fixed top-0 left-0 bottom-0">
        <div className="p-4 border-b border-border">
          <p className="text-[14px] font-semibold">
            Admin<span className="text-accent">.</span>
          </p>
          <p className="text-[11px] text-muted mt-0.5">Portofolio Manager</p>
        </div>

        <nav className="flex-1 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={clsx(
                "w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-all border-l-2",
                section === item.id
                  ? "bg-paper text-ink font-medium border-accent"
                  : "text-muted hover:text-ink hover:bg-paper border-transparent"
              )}
            >
              <span className="text-[14px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <a
            href="/"
            target="_blank"
            className="block text-[12px] text-muted hover:text-accent transition-colors mb-2"
          >
            ↗ Lihat Website
          </a>
          <button
            onClick={handleLogout}
            className="text-[12px] text-muted hover:text-red-500 transition-colors"
          >
            🚪 Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-52 flex-1 p-8">
        {/* ===== DASHBOARD ===== */}
        {section === "dashboard" && (
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight mb-1">
              Dashboard
            </h1>
            <p className="text-[13px] text-muted mb-8">
              RingkasanaryaDarma Putri dan aktivitas website kamu.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { label: "Total Karya", value: projects.length },
                { label: "Karya Featured", value: featured.length },
                { label: "Kategori Aktif", value: new Set(projects.map((p) => p.category)).size },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-border rounded-xl p-5">
                  <p className="text-[28px] font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-muted uppercase tracking-wide mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted mb-4">
              KaryaDarma Putri Terbaru
              </p>
              <div className="space-y-2">
                {projects.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
                      style={{ backgroundColor: "#1A1A1A" }}
                    >
                      {p.title.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate">{p.title}</p>
                      <p className="text-[11px] text-muted">
                        {CATEGORY_LABELS[p.category] ?? p.category}
                      </p>
                    </div>
                    {p.is_featured && (
                      <span className="text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                ))}
                {projects.length === 0 && !loading && (
                  <div className="text-center py-12 text-[13px] text-muted border border-dashed border-border rounded-xl">
                    Belum adaaryaDarma Putri. Klik "UploadaryaDarma Putri" untuk mulai.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== UPLOAD ===== */}
        {section === "upload" && (
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight mb-1">
              UploadaryaDarma Putri Baru
            </h1>
            <p className="text-[13px] text-muted mb-8">
              Isi semua field di bawah, lalu klik Upload.
            </p>

            <form onSubmit={handleUpload} className="max-w-xl space-y-5">
              {/* Upload zone */}
              <div>
                <label className="block text-[12px] text-muted mb-1.5">
                  GambararyaDarma Putri
                </label>
                <div
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  {previewUrl ? (
                    <div className="relative h-[140px] rounded-lg overflow-hidden">
                      <Image src={previewUrl} alt="preview" fill className="object-cover" sizes="480px" />
                    </div>
                  ) : (
                    <>
                      <p className="text-[28px] mb-2">🖼️</p>
                      <p className="text-[13px] font-medium text-ink">
                        Klik atau drag gambar ke sini
                      </p>
                      <p className="text-[12px] text-muted mt-1">
                        JPG, PNG, WebP · Maks. 5MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreviewUrl(URL.createObjectURL(file));
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-muted mb-1.5">
                    JudularyaDarma Putri *
                  </label>
                  <input
                    name="title"
                    required
                    placeholder="Contoh: Arcana Coffee Co."
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-white focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] text-muted mb-1.5">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-white focus:border-accent focus:outline-none"
                  >
                    <option value="branding">Branding</option>
                    <option value="socmed">Social Media Kit</option>
                    <option value="uiux">UI/UX</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-muted mb-1.5">
                  Deskripsi Singkat
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Ceritakan singkat tentang project ini..."
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-white focus:border-accent focus:outline-none resize-none"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  name="is_featured"
                  type="checkbox"
                  className="w-4 h-4 accent-[#E07B39]"
                />
                <span className="text-[13px]">
                  Tampilkan di halaman Home (featured)
                </span>
              </label>

              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2.5 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-dark transition-colors disabled:opacity-60"
              >
                {uploading ? "Mengupload..." : "UploadaryaDarma Putri →"}
              </button>
            </form>
          </div>
        )}

        {/* ===== MANAGE ===== */}
        {section === "manage" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[22px] font-semibold tracking-tight mb-1">
                  KelolaaryaDarma Putri
                </h1>
                <p className="text-[13px] text-muted">
                  {projects.length}aryaDarma Putri tersimpan
                </p>
              </div>
              <button
                onClick={() => setSection("upload")}
                className="px-4 py-2 bg-accent text-white rounded-lg text-[12px] font-medium hover:bg-accent-dark transition-colors"
              >
                + Upload Baru
              </button>
            </div>

            {loading ? (
              <p className="text-[13px] text-muted">Memuat...</p>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-border rounded-xl">
                <p className="text-[13px] text-muted">Belum adaaryaDarma Putri.</p>
                <button
                  onClick={() => setSection("upload")}
                  className="mt-3 text-[12px] text-accent hover:underline"
                >
                  UploadaryaDarma Putri pertama →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-4 bg-white border border-border rounded-xl"
                  >
                    {/* Thumb */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-ink flex-shrink-0 relative">
                      {p.image_url ? (
                        <Image src={p.image_url} alt={p.title} fill className="object-cover" sizes="56px" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-white text-[14px] font-bold">
                          {p.title.slice(0, 2)}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-ink truncate">
                        {p.title}
                      </p>
                      <p className="text-[11px] text-muted mt-0.5">
                        {CATEGORY_LABELS[p.category]}
                        {p.is_featured && (
                          <span className="ml-2 text-accent">· Featured</span>
                        )}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setEditingProject(p)}
                        className="px-3 py-1.5 border border-border rounded-lg text-[12px] text-muted hover:text-ink hover:border-ink/30 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.image_url)}
                        className="px-3 py-1.5 border border-border rounded-lg text-[12px] text-muted hover:text-red-500 hover:border-red-300 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {section === "settings" && (
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight mb-1">
              Pengaturan
            </h1>
            <p className="text-[13px] text-muted mb-8">
              Kelola keamanan akun admin kamu.
            </p>
            <div className="max-w-sm space-y-4">
              <div>
                <label className="block text-[12px] text-muted mb-1.5">
                  Ganti Password Baru
                </label>
                <input
                  type="password"
                  placeholder="Password baru"
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-white focus:border-accent focus:outline-none"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length > 2) {
                      // Update password via Supabase
                      // supabase.auth.updateUser({ password: val })
                    }
                  }}
                />
              </div>
              <button
                onClick={async () => {
                  const input = document.querySelector("input[type=password]") as HTMLInputElement;
                  if (!input?.value) return;
                  const { error } = await supabase.auth.updateUser({ password: input.value });
                  if (error) toast.error("Gagal update password.");
                  else toast.success("Password berhasil diubah!");
                }}
                className="px-5 py-2.5 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-dark transition-colors"
              >
                Simpan Password
              </button>

              <div className="mt-6 p-4 bg-[#FFF8F5] border border-[#F0C8A8] rounded-xl">
                <p className="text-[12px] text-[#8B5E3C] leading-relaxed">
                  🔒 Data kamu disimpan aman di Supabase dengan enkripsi.
                  Backup otomatis dilakukan setiap hari. Hanya kamu yang bisa
                  login ke panel ini.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingProject && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 flex items-center justify-center p-4"
          onClick={() => setEditingProject(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-semibold mb-4">EditaryaDarma Putri</h3>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-[12px] text-muted mb-1.5">
                  Judul
                </label>
                <input
                  name="edit_title"
                  defaultValue={editingProject.title}
                  required
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[12px] text-muted mb-1.5">
                  Kategori
                </label>
                <select
                  name="edit_category"
                  defaultValue={editingProject.category}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] focus:border-accent focus:outline-none"
                >
                  <option value="branding">Branding</option>
                  <option value="socmed">Social Media Kit</option>
                  <option value="uiux">UI/UX</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-muted mb-1.5">
                  Deskripsi
                </label>
                <textarea
                  name="edit_description"
                  defaultValue={editingProject.description}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] focus:border-accent focus:outline-none resize-none"
                />
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  name="edit_featured"
                  type="checkbox"
                  defaultChecked={editingProject.is_featured}
                  className="w-4 h-4 accent-[#E07B39]"
                />
                <span className="text-[13px]">Featured di Home</span>
              </label>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-dark transition-colors"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="flex-1 py-2.5 border border-border rounded-lg text-[13px] text-muted hover:text-ink transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
