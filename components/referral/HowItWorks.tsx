export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Share your link",
      desc: `Send your unique referral link to friends, family, or anyone who appreciates luxury fashion. Share it on social media, via text, or however you connect.`,
      dark: true,
    },
    {
      id: 2,
      title: "They join FoReal",
      desc: `When someone signs up using your link and completes their first rental, that's when the magic happens. They get access to designer fashion, and you both get rewarded.`,
      dark: true,
    },
    {
      id: 3,
      title: "Earn €25 credits each",
      desc: `You both receive €25 in rental credits. Use them on any piece in our collection. No expiration dates. No strings attached. Just pure fashion freedom.`,
      dark: false,
    },
  ];

  return (
    <section className=" py-8 md:py-32">
      <div className="container-md mx-auto px-4">
        {/* TOP TEXT */}
        <p className="sec_tagline mb-6">How it works</p>

        <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8 md:mb-16">
          Three steps to
          <span className="italic block">earning credits.</span>
        </h2>

        {/* STEPS */}
        <div className="flex flex-col gap-4 md:gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-6 md:gap-10">
              {/* NUMBER CIRCLE */}
              <div
                className="h-8 w-8 md:w-16 md:h-16 flex items-center justify-center rounded-full text-lg font-medium shrink-0 bg-primary text-white
                "
              >
                {step.id}
              </div>

              {/* CONTENT */}
              <div>
                <h3 className="text-2xl md:text-2xl font-serif mb-3">
                  {step.title}
                </h3>

                <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
