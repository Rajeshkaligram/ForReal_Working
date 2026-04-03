import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StyleGuides() {
  const data = [
    {
      img: "/assets/images/style2.jpeg",
      pieces: "8 pieces",
      title: "Wedding Season",
      desc: "Elegant pieces for celebrations and formal events",
      tags: ["Formal", "Dresses", "Accessories"],
      link: "/collections",
    },
    {
      img: "/assets/images/style.jpeg",
      pieces: "17 pieces",
      title: "Work & Office",
      desc: "Professional looks that command attention",
      tags: ["Business", "Tailored", "Professional"],
      link: "/collections",
    },
    {
      img: "/assets/images/style.jpeg",
      pieces: "8 pieces",
      title: "Vacation Mode",
      desc: "Effortless pieces for getaways and travel",
      tags: ["Travel", "Resort", "Casual"],
      link: "/collections",
    },
    {
      img: "/assets/images/style2.jpeg",
      pieces: "8 pieces",
      title: "Vacation Mode",
      desc: "Effortless pieces for getaways and travel",
      tags: ["Travel", "Resort", "Casual"],
      link: "/collections",
    },
  ];

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        {/* HEADER */}
        <div className="mb-4 md:mb-12">
          <p className="sec_tagline">Curated collections</p>

          <h2 className="sec_title font-serif! mb-4">Style Guides</h2>

          <p className="sec_details max-w-xl">
            Discover curated collections for every occasion. From weddings to
            festivals, we've assembled the perfect pieces to match your moment.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {data.map((item, i) => (
            <Link
              href={item.link}
              key={i}
              className="group bg-white transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={400}
                  height={500}
                  className="w-full h-60 sm:h-80 md:h-100 object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                {/* subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

                {/* PIECES BADGE */}
                <span className="absolute top-4 right-4 bg-white text-xs px-3 py-1 font-medium">
                  {item.pieces}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-2 md:p-4">
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2">
                  {item.title}
                </h3>

                <p className="text-muted text-xs md:text-sm mb-4">
                  {item.desc}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] tracking-wide uppercase px-2 py-1 bg-muted/10 text-muted hover:bg-muted/20 transition cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* LINK */}
                <div className="text-[10px] md:text-xs md:tracking-[0.2em] uppercase flex items-center gap-2 text-primary group-hover:text-maroon font-medium ">
                  Explore Collection
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
