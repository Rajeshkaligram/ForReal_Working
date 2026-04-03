"use client";

import { useState } from "react";
import Image from "next/image";

export default function TeamSection() {
  const slides = [
    {
      img: "/assets/images/team3.jpeg",
      name: "Anna Lerus",
      role: "Product & Strategy Lead",
      desc: `Growing up in Atlanta, Anna watched her mother meticulously care for designer pieces that rarely saw daylight. She realized that luxury fashion was sitting idle in closets worldwide while others couldn't access it. With a background in product strategy at tech startups, Anna envisioned a platform that could unlock this dormant value. She shapes FoReal's product vision and strategic direction, ensuring every feature serves the mission of democratizing luxury fashion.`,
    },
    {
      img: "/assets/images/team2.jpeg",
      name: "John Carter",
      role: "Creative Director",
      desc: `Growing up in Atlanta, Anna watched her mother meticulously care for designer pieces that rarely saw daylight. She realized that luxury fashion was sitting idle in closets worldwide while others couldn't access it. With a background in product strategy at tech startups, Anna envisioned a platform that could unlock this dormant value. She shapes FoReal's product vision and strategic direction, ensuring every feature serves the mission of democratizing luxury fashion.`,
    },
    {
      img: "/assets/images/team1.jpeg",
      name: "Emily Stone",
      role: "Marketing Lead",
      desc: `Growing up in Atlanta, Anna watched her mother meticulously care for designer pieces that rarely saw daylight. She realized that luxury fashion was sitting idle in closets worldwide while others couldn't access it. With a background in product strategy at tech startups, Anna envisioned a platform that could unlock this dormant value. She shapes FoReal's product vision and strategic direction, ensuring every feature serves the mission of democratizing luxury fashion.`,
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* IMAGE */}
          <div className="relative w-full h-80 sm:h-100 md:h-140 overflow-hidden">
            <Image
              src={slides[current].img}
              alt={slides[current].name}
              fill
              className="object-cover transition duration-500"
            />
          </div>

          {/* CONTENT */}
          <div className="max-w-xl">
            <h2 className=" text-3xl md:text-5xl mb-2 md:mb-4 montserrat">
              {slides[current].name}
            </h2>

            <p className="text-muted mb-6 text-sm md:text-base font-medium">
              {slides[current].role}
            </p>

            <p className="text-muted leading-relaxed text-sm md:text-base mb-4 md:mb-8 ">
              {slides[current].desc}
            </p>

            {/* DOTS */}
            <div className="flex gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2  transition-all duration-300 cursor-pointer ${
                    current === i ? "w-10 bg-[#122B2BCC]" : "w-2 bg-muted/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
