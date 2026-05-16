import PublicLayout from "@/components/layout/PublicLayout";
import ContactForm from "@/components/ui/ContactForm";

const contactInfo = [
  { icon: "📧", label: "Email", value: "Risa Darma Putri@email.com" },
  { icon: "📱", label: "WhatsApp", value: "+62 812-3456-7890" },
  { icon: "🔗", label: "Behance", value: "behance.net/Risa Darma Putripratama" },
  { icon: "📍", label: "Lokasi", value: "Jakarta, Indonesia" },
];

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <p className="text-[12px] tracking-[2px] uppercase text-accent font-medium mb-3">
              Get in Touch
            </p>
            <h1 className="text-[32px] font-semibold tracking-tight text-ink mb-4">
              Ayo Ngobrol
            </h1>
            <p className="text-[14px] leading-relaxed text-muted mb-10">
              Ada project menarik? Atau sekadar ingin tanya-tanya soal harga?
              Saya siap merespons dalam 24 jam.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center text-[16px] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-muted">{item.label}</p>
                    <p className="text-[13px] text-ink">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white border border-border rounded-2xl p-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
