"use client";

export default function ForOwners() {
  const steps = [
    {
      no: "01",
      title: "List in minutes",
      text: "Upload photos, set your daily rate, add details. Your piece goes live instantly, reaching thousands of fashion-conscious renters.",
    },
    {
      no: "02",
      title: "Control your calendar",
      text: "You approve every booking request. Full control over who rents, when, and for how long. Your wardrobe, your rules.",
    },
    {
      no: "03",
      title: "Ship with confidence",
      text: "Send your piece using our prepaid label.",
    },
    {
      no: "04",
      title: "Earn passively",
      text: "Your wardrobe works for you.",
    },
  ];

  return (
    <section className="w-full py-8 md:py-32" id="owners">
      <div className="max-w-5xl mx-auto px-4">
        {/* TOP TITLE */}
        <div className="">
          <p className="sec_tagline mb-6">FOR RENTERS</p>

          <h2 className="sec_title font-serif!">
            List. Approve.

      
            <span className=" block italic">Ship. Earn.</span>
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
