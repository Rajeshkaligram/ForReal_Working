import Link from "next/link";

export default function StatsCTASection() {
  return (
    <section className="pb-8 md:pb-32">
      <div className="container-md">
        <div className="border border-border bg-muted/10  px-5 md:px-10 py-8 md:py-14 text-center">
          {/* TOP STATS */}
          <div className="grid grid-cols-2 gap-6 md:gap-10 items-center">
            {/* LEFT */}
            <div>
              <h2 className="font-serif text-3xl md:text-5xl mb-2">2026</h2>
              <p className="text-xs tracking-[0.3em] uppercase text-muted font-medium">
                Founded
              </p>
            </div>

            {/* RIGHT */}
            <div>
              <h2 className="font-serif text-3xl md:text-5xl mb-2">100%</h2>
              <p className="text-xs tracking-[0.3em] uppercase text-muted font-medium">
                Woman-led
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-border my-8 md:my-12" />

          {/* BUTTON */}
          <Link href="/list-wardrobe">
            <button className="btn-bg">List Your Wardrobe</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
