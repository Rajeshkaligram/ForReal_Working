import React from "react";

export default function AboutHero() {
  return (
    <section className="py-8 md:py-32">
      <div className="container-md">
        <div className=" flex-col flex gap-4 md:gap-10">
          <p className="sec_tagline">About FoReal</p>

          <h1 className="text-2xl sm:text-4xl md:text-7xl font-serif font-medium">
            Built by four women
            <span className="block italic">who saw a better way.</span>
          </h1>

          <p className="text-muted text-base md:text-lg max-w-xl leading-snug">
            We're Anna, Jasmine, Rachel, and Chloe — four African American women
            who believed luxury fashion shouldn't be locked behind price tags.
            In 2026, we built FoReal to democratize access to designer pieces
            while creating a sustainable, circular fashion economy.
          </p>
        </div>
      </div>
    </section>
  );
}
