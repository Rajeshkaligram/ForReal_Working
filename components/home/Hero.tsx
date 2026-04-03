import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
<section className="relative w-full h-[clamp(800px,80vh,900px)]">
      {/* Background Image */}
      <Image
        src="/assets/images/hero-back.png"
        alt="hero"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container  h-full flex items-center">
        <div className="max-w-xl text-white">
          <p className="tracking-[4px] text-xs mb-6 text-secondary/55 ">
            FASHION. REIMAGINED.
          </p>

          <h1 className="text-5xl md:text-7xl  leading-tight mb-6 montserrat font-medium text-white">
            <span className="block">Real,</span>
            <span className="block">for the </span>
            <span className="block"> moment.</span>
          </h1>

          <div className="w-12 h-0.5 bg-offwhite mb-6"></div>

          <p className="text-secondary/72 mb-8">
            Rent designer and premium fashion. Look extraordinary, without the
            permanent price tag.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/discover" className="btn-bg">
              START EXPLORING
            </Link>

            <Link href="/listing" className="btn-transparent">
              START POSTING
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-offwhite/25 to-transparent"></div>
    </section>
  );
}
