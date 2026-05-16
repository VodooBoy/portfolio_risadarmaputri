import PublicLayout from "@/components/layout/PublicLayout";

const skills = [
  "Brand Identity",
  "Social Media Kit",
  "UI/UX Design",
  "Typography",
  "Figma",
  "Adobe Illustrator",
  "Photoshop",
  "Motion Design",
];

const experience = [
  {
    company: "Freelance Designer",
    role: "20+ klien, berbagai industri",
    year: "2021 – Sekarang",
  },
  {
    company: "Studio Kreatif Nusantara",
    role: "Junior Visual Designer",
    year: "2020 – 2021",
  },
  {
    company: "Universitas Indonesia",
    role: "S1 Desain Komunikasi Visual",
    year: "Lulus 2020",
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: Bio */}
          <div>
            {/* Avatar placeholder — ganti dengan foto asli kamu */}
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-[28px] font-semibold text-white mb-6">
              AP
            </div>
            <p className="text-[12px] tracking-[2px] uppercase text-accent font-medium mb-2">
              Visual Designer & Brand Strategist
            </p>
            <h1 className="text-[32px] font-semibold tracking-tight text-ink mb-5">
              Risa Darma Putri
            </h1>
            <div className="space-y-4 text-[14px] leading-relaxed text-muted">
              <p>
                Saya desainer visual dengan 4+ tahun pengalaman membantu brand —
                dari startup sampai bisnis lokal — punya identitas yang kuat dan
                konsisten.
              </p>
              <p>
                Berangkat dari latar belakang Desain Komunikasi Visual, saya
                percaya bahwa desain yang baik bukan cuma soal estetika, tapi
                soal fungsi dan cerita yang dibawa.
              </p>
              <p>
                Filosofi kerja saya sederhana:{" "}
                <span className="text-ink font-medium">
                  bersih tapi berkarakter
                </span>
                . Tidak terlalu ramai, tapi tidak flat dan membosankan.
              </p>
            </div>
          </div>

          {/* Right: Skills + Experience */}
          <div>
            <div className="mb-10">
              <p className="text-[11px] tracking-[1.5px] uppercase text-muted font-medium mb-4">
                Skill
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-lg text-[12px] text-ink"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] tracking-[1.5px] uppercase text-muted font-medium mb-4">
                Pengalaman
              </p>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div
                    key={exp.company}
                    className="border-l-2 border-border pl-4"
                  >
                    <p className="text-[13px] font-medium text-ink">
                      {exp.company}
                    </p>
                    <p className="text-[12px] text-muted mt-0.5">{exp.role}</p>
                    <p className="text-[11px] text-accent mt-0.5">{exp.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Download CV — opsional */}
            <a
              href="/cv-Risa Darma Putri-pratama.pdf"
              className="inline-flex items-center gap-2 mt-8 px-4 py-2 border border-border rounded-lg text-[12px] text-muted hover:text-ink hover:border-ink/30 transition-colors"
            >
              ↓ Download CV
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
