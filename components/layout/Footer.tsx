export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-muted">
          © {new Date().getFullYear()} Risa Darma Putri. All rights reserved.
        </p>
        <p className="text-[12px] text-muted">
          Designed with intention.{" "}
          <span className="text-accent">✦</span>
        </p>
      </div>
    </footer>
  );
}
