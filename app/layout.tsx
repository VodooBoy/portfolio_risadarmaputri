import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // Menambahkan Poppins berdampingan dengan Inter
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";

// Mengatur font Inter untuk teks standar/body
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

// Mengatur font Poppins Black (weight 900) untuk judul animasi typing nanti
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "800", "900"], // Tambahkan ketebalan baru di sini
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Risa Darma Putri — Visual Designer",
  description:
    "Portofolio Risa Darma Putri, Visual Designer spesialis Branding, Social Media Kit, dan UI/UX.",
  openGraph: {
    title: "Risa Darma Putri — Visual Designer",
    // PERBAIKAN: Teks di bawah ini sudah dikembalikan menjadi kalimat yang benar & profesional
    description: "Bersih tapi berkarakter. Lihat karya-karya terbaik saya.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        // Menambahkan poppins.variable agar variabel CSS Poppins bisa dibaca oleh Tailwind config
        className={`${inter.className} ${poppins.variable} bg-paper text-ink antialiased`}>
          <ThemeProvider>
            {children}
            <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--ink)",
                color: "var(--paper)",
                fontSize: "13px",
                borderRadius: "8px",
              },
            }}
          />
          </ThemeProvider>
      </body>
    </html>
  );
}