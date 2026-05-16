"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      project: (form.elements.namedItem("project") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
        toast.success("Pesan terkirim! Saya akan balas dalam 24 jam.");
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast.error("Gagal mengirim. Coba lagi ya.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-[40px] mb-4">✉️</div>
        <h3 className="text-[18px] font-medium mb-2">Pesan Terkirim!</h3>
        <p className="text-[13px] text-muted">
          Saya akan merespons dalam 24 jam ke email kamu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[12px] text-muted mb-1.5">
          Nama Lengkap
        </label>
        <input
          name="name"
          required
          placeholder="Contoh: Budi Santoso"
          className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-white focus:border-accent focus:outline-none transition-colors"
        />
      </div>
      <div>
        <label className="block text-[12px] text-muted mb-1.5">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="email@kamu.com"
          className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-white focus:border-accent focus:outline-none transition-colors"
        />
      </div>
      <div>
        <label className="block text-[12px] text-muted mb-1.5">
          Jenis Project
        </label>
        <select
          name="project"
          className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-white focus:border-accent focus:outline-none transition-colors"
        >
          <option value="Branding">Branding</option>
          <option value="Social Media Kit">Social Media Kit</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>
      <div>
        <label className="block text-[12px] text-muted mb-1.5">Pesan</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Ceritakan project kamu..."
          className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] bg-white focus:border-accent focus:outline-none transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-accent text-white rounded-lg text-[13px] font-medium hover:bg-accent-dark transition-colors disabled:opacity-60"
      >
        {loading ? "Mengirim..." : "Kirim Pesan →"}
      </button>
      <p className="text-[11px] text-muted text-center">
        ✓ Pesan masuk langsung ke inbox saya
      </p>
    </form>
  );
}
