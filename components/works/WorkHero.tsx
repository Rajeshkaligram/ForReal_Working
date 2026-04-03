"use client";

export default function WorkHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      const yOffset = -100; // adjust if you have sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-[url('/assets/images/work-hero.png')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,43,43,0.4)_0%,rgba(18,43,43,0.9)_100%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p className="sec-tagline text-white/80 pb-10 tracking-[0.3em] text-muted font-medium text-[8.96px]">
        HOW IT WORKS
        </p>
        <h1
          className="text-[rgb(248,246,243)] text-[clamp(3rem,8vw,7.5rem)] 
font-light leading-[0.95] tracking-[-0.02em] 
mb-10 font-serif"
        >
          <span className="block">Rent fashion.</span>
          <span className="italic">Earn from yours.</span>
        </h1>

        <p className="text-white/80 mt-6 max-w-140 mx-auto text-base md:text-lg">
          Whether you're here to discover or to post, we've built FoReal to feel
          effortless.
        </p>

        <div className="flex gap-4 mt-4 md:mt-16 flex-wrap justify-center">
          <button
            onClick={() => scrollToSection("renters")}
            className="btn-transparent"
          >
            FOR RENTERS
          </button>

          <button
            onClick={() => scrollToSection("owners")}
            className="btn-transparent"
          >
            FOR OWNERS
          </button>

          <button
            onClick={() => scrollToSection("FAQ")}
            className="btn-transparent"
          >
            FAQ
          </button>
        </div>
      </div>
    </section>
  );
}
