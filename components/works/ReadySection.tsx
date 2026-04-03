import Link from "next/link";

export default function ReadySection() {
  return (
    <section className="w-full py-8 md:py-32">
      <div className="container-md mx-auto px-4 text-center">
        {/* TITLE */}
        <h2 className="text-4xl md:text-7xl font-serif text-primary mb-10">
          Ready to begin?
        </h2>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* BLACK BUTTON */}
          <Link href="/discover" className="btn-bg">
            Browse Pieces
          </Link>

          {/* OUTLINE Link */}
          <Link
            href=""
            className="btn-transparent text-black! border-border! border hover:bg-muted/20!"
          >
            List your wardrobe
          </Link>
        </div>
      </div>
    </section>
  );
}
