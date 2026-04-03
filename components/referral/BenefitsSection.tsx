export default function BenefitsSection() {
  const data = [
    {
      tag: "Unlimited rewards",
      title: "No limits on earnings",
      desc: `Invite as many friends as you want. Every successful referral earns you €25. The more you share, the more you earn.`,
    },
    {
      tag: "Flexible credits",
      title: "Never expire",
      desc: `Your credits stay in your account forever. Use them whenever you're ready — on any rental, any designer, any time.`,
    },
    {
      tag: "Instant rewards",
      title: "Credits applied immediately",
      desc: `As soon as your friend completes their first rental, credits appear in both accounts. No waiting, no hassle.`,
    },
  ];

  return (
    <section className=" py-8 md:py-16">
      <div className="container-md mx-auto px-4">
        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {data.map((item, i) => (
            <div
              key={i}
              className="border border-border bg-muted/10 p-4 sm:p-6 md:p-10"
            >
              {/* TAG */}
              <p className="sec_tagline">
                {item.tag}
              </p>

              {/* TITLE */}
              <h3 className="font-serif text-xl md:text-2xl mb-4 leading-snug">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTNOTE */}
        <p className="text-center text-xs md:text-sm text-muted mt-5 md:mt-10 xl:mt-16 max-w-3xl mx-auto leading-relaxed">
          Credits are applied to your FoReal account and can be used on any
          rental. Referred friends must complete their first rental to activate
          credits for both parties. Credits never expire and have no spending
          restrictions.
        </p>
      </div>
    </section>
  );
}
