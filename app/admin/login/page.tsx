"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error("Email atau password salah.");
      setLoading(false);
    } else {
      toast.success("Login berhasil!");
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-[22px] font-semibold tracking-tight">
            Admin<span className="text-accent">.</span>
          </p>
          <p className="text-[13px] text-muted mt-1">
            Panel manajemen portofolio
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="text-[16px] font-medium mb-1">Masuk</h2>
          <p className="text-[12px] text-muted mb-6">Khusus pemilik website</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] text-muted mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="email@kamu.com"
                className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-paper focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] text-muted mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-paper focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-dark transition-colors disabled:opacity-60"
            >
              {loading ? "Masuk..." : "Masuk ke Admin →"}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-5 p-3 bg-[#FFF8F5] border border-[#F0C8A8] rounded-lg">
            <p className="text-[11px] text-[#8B5E3C] leading-relaxed">
              🔒 Halaman ini terlindungi. Hanya kamu yang punya akses. Tidak ada
              fitur register — akun dibuat satu kali saat setup.
            </p>
          </div>
        </div>

        <p className="text-center text-[11px] text-muted mt-6">
          <a href="/" className="hover:text-accent transition-colors">
            ← Kembali ke website
          </a>
        </p>
      </div>
    </div>
  );
}
