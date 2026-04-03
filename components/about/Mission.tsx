export default function Mission() {
  return (
    <section className="py-8 md:py-32">
      <div className="container-md">

        {/* TAGLINE */}
        <p className="sec_tagline text-center md:text-left">
          Our Mission
        </p>

        {/* HEADING */}
        <h2 className="font-serif! sec_title mb-6 md:mb-8">
          Access over ownership. <br />
          <span className="italic">Community over competition.</span>
        </h2>

        {/* DESCRIPTION */}
        <div className="space-y-4 md:space-y-6 max-w-3xl text-muted text-sm md:text-base leading-relaxed">
          <p>
            We're building a circular fashion economy where premium pieces
            circulate instead of sitting idle. Where renters discover
            extraordinary looks without the retail price, and owners earn from
            wardrobes that were once just closet space.
          </p>

          <p>
            FoReal is for the fashion-forward who value sustainability,
            accessibility, and the belief that everyone deserves to wear what
            makes them feel powerful.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-border my-5 sm:my-10 md:my-16" />

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-8 md:gap-12">

          {/* ITEM 1 */}
          <div>
            <p className="text-xs tracking-[0.2em] font-medium uppercase text-muted mb-3">
              Accessible
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Premium fashion shouldn't be exclusive. We're democratizing luxury,
              one rental at a time.
            </p>
          </div>

          {/* ITEM 2 */}
          <div>
            <p className="text-xs tracking-[0.2em] font-medium uppercase text-muted mb-3">
              Sustainable
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Circular consumption over fast fashion. Every rental reduces waste
              and extends garment life.
            </p>
          </div>

          {/* ITEM 3 */}
          <div>
            <p className="text-xs tracking-[0.2em] font-medium uppercase text-muted mb-3">
              Community-first
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Built by women, for a diverse community. We center the voices we
              serve.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}