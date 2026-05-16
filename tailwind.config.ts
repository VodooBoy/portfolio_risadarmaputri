import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <--- TAMBAHAN WAJIB UNTUK DARK MODE
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      // Mengambil warna dari globals.css
      colors: {
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        "accent-dark": "var(--accent-dark)",
        ink: "var(--ink)",
        paper: "var(--paper)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        typing: "typing 3.5s steps(35, end) forwards",
        blink: "blink 0.75s step-end infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        typing: {
          "from": { width: "0" },
          "to": { width: "100%" }
        },
        blink: {
          "50%": { borderColor: "transparent" }
        }
      },
    },
  },
  plugins: [],
};
export default config;