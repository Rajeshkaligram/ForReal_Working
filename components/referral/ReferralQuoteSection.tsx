import Image from "next/image";

export default function ReferralQuoteSection() {
  return (
    <section className="relative w-full h-[40vh] md:h-[75vh] overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <Image
        src="/assets/images/fashion-bg.jpeg"
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
          “The best fashion experiences are the ones you share. 
          That's the philosophy behind our referral program.”
        </p>
      </div>
    </section>
  );
}