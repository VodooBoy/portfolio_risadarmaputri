"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeToggle from "@/components/ThemeToggle"; // Memanggil saklar Dark Mode

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-border transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-[15px] tracking-tight text-ink">
          Risa Darma Putri<span className="text-accent">.</span>
        </Link>

        {/* Nav links & Theme Toggle */}
        <div className="flex items-center gap-5 sm:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-[13px] transition-colors duration-150",
                pathname === link.href
                  ? "text-ink font-medium"
                  : "text-muted hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Garis pemisah estetik (hanya muncul di layar agak lebar) */}
          <div className="hidden sm:block w-[1px] h-4 bg-border"></div>
          
          {/* Tombol Dark/Light Mode */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}