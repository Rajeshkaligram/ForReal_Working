import React from "react";

const steps = [
  {
    id: "01",
    tag: "FOR RENTERS",
    title: "Discover",
    desc: "Browse hundreds of curated pieces from verified users. Filter by size, style, occasion, or designer.",
  },
  {
    id: "02",
    tag: "HASSLE-FREE",
    title: "Rent & Wear",
    desc: "Book your chosen piece for the dates you need. Receive it. Wear it. Feel it.",
  },
  {
    id: "03",
    tag: "FOR OWNERS",
    title: "Return or Post",
    desc: "Send it back effortlessly, or post your own wardrobe and start earning from the comfort of your own home.",
  },
];

export default function Process() {
  return (
    <section className="py-8 md:py-32">
      <div className="container-md mx-auto px-4">
        {/* Top */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-10 mb-8  md:mb-16">
          <div>
            <p className="text-xs tracking-[4px] text-muted mb-4">
              THE PROCESS
            </p>

            <h2 className="sec_title">
              Simple by design.
              <br />
              Effortless by nature.
            </h2>
          </div>

          <div className="flex items-center md:justify-end text-muted">
            <p className="max-w-65 text-xs md:text-sm  leading-[1.75]">
              Three steps stand between you and the outfit of your life.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 border-t border-b border-border">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`
        py-5 md:py-12
        md:px-12

        
        ${index === 0 ? "pl-0 md:pl-0" : ""}

      
        ${index === steps.length - 1 ? "pr-0 md:pr-0" : ""}

        md:${index !== steps.length - 1 ? "border-r border-border" : ""}
         ${index === 1 ? "md:border-r " : ""}

        
        ${index !== steps.length - 1 ? "border-b border-border md:border-b-0" : ""}
      `}
            >
              <div className="flex justify-between gap-5 md:gap-10 items-start">
                <div className="text-4xl md:text-7xl text-muted/30 montserrat">
                  {item.id}
                </div>

                <span className="text-xs border border-border tracking-widest px-3 py-1 text-muted">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-xl montserrat font-normal md:text-3xl mt-6 mb-3 text-primary">
                {item.title}
              </h3>

              <p className="text-muted text-xs md:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
