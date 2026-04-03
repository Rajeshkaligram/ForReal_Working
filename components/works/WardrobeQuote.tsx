export default function WardrobeHero() {
  return (
    <section
      className="relative h-[40vh] md:h-[70vh] md:min-h-125  flex items-center justify-left bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `url('assets/images/work-bg.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-[rgba(248,246,243,0.7)] to-[rgba(248,246,243,0)]" />

      {/* Optional softer vignette at bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-lg  px-6 sm:px-10 text-left">
       <h2 className="text-[rgb(20,20,20)]! text-[clamp(1.5rem,3vw,2.5rem)] 
font-normal leading-tight tracking-[-0.01em] 
font-serif mb-0">
  "Your wardrobe is currency. Let it work for you."
</h2>
      </div>
    </section>
  );
}
