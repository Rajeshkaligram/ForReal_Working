import Image from "next/image";

export default function AboutQuoteSection() {
  return (
    <section className="relative w-full h-[40vh] md:h-[75vh] overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <Image
        src="/assets/images/about-qoute.jpeg"
        alt="fashion"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 bg-linear-to-t from-white/80 via-white/30 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-8 md:bottom-16 left-4 md:left-12 max-w-xl">
        <p className="font-serif text-lg md:text-3xl leading-snug text-primary">
          "We built FoReal for people like us — who appreciate luxury but refuse
          to let ownership dictate access."
        </p>
      </div>
    </section>
  );
}
