"use client";

export default function ForRenters() {
  const steps = [
    {
      no: "01",
      title: "Browse with intention",
      text: "Explore quality pieces from verified listers. Filter by what speaks to you and save.",
    },
    {
      no: "02",
      title: "Book your moment",
      text: "Select your dates. Confirm your details. Pay securely.",
    },
    {
      no: "03",
      title: "Wear it well",
      text: "Own the moment. Live the experience.",
    },
    {
      no: "04",
      title: "Return effortlessly",
      text: "Pack it and drop it. A prepaid label is included.",
    },
  ];

  return (
    <section className="w-full py-8 md:py-32" id="renters">
      <div className="max-w-5xl mx-auto px-4">
        {/* TOP TITLE */}
        <div className="">
          <p className="sec_tagline mb-6">FOR RENTERS</p>

          <h2 className="sec_title font-serif!">
            Discover. Book.
            <span className=" block italic">Wear. Return.</span>
          </h2>
        </div>

        {/* LIST */}
        <div className="mt-8 md:mt-16">
          {steps.map((item, i) => (
            <div
              key={i}
              className="border-t border-border py-8  md:py-16 flex gap-5 md:gap-10 items-start"
            >
              {/* NUMBER */}
              <div className="text-3xl md:text-5xl text-muted/30 font-serif w-10 md:w-20  shrink-0">
                {item.no}
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-xl md:text-3xl font-serif">{item.title}</h3>

                <p className="text-muted mt-2 max-w-md text-sm md:text-base">
                  {item.text}
                </p>
              </div>
            </div>
          ))}

          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
