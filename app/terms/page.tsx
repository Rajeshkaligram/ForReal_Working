"use client";

export default function TermsPage() {
  return (
    <section className="py-8  md:py-16">
      <div className="container max-w-4xl! space-y-5 md:space-y-10">
        {/* TITLE */}
        <div className="space-y-2">
          <h1 className="font-serif! text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.01em] mb-8">
            Terms & Conditions
          </h1>
          <p className="text-xs text-muted">
            Effective as of December 24, 2017
          </p>
        </div>

        {/* INTRO */}
        <div className="space-y-4 text-[15.2px] text-muted leading-relaxed">
          <p>
            FoReal's Terms and Conditions Agreement explains the terms and
            conditions under which you are able to use the FoReal Platform and
            other services provided by FoReal. Please read these Terms and
            Conditions of Use carefully.
          </p>

          <p>
            By signing up for our services you expressly agree to be legally
            bound by our Terms and Conditions stated in this document. If you do
            not agree with or cannot comply with these terms, do not use our
            services.
          </p>

          <p>
            These Terms do not interfere with any obligation or authorization
            provided in any other agreement concluded between you and FoReal.
          </p>
        </div>

        {/* DEFINITIONS */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium text-black/60">1. Definitions</h2>

          <p className="text-sm text-muted leading-relaxed">
            The following definitions explain some of the terminology used
            throughout our Terms and Conditions:
          </p>

          <ul className="text-sm text-muted space-y-2 leading-relaxed list-disc pl-5">
            <li>
              <strong>"Terms/Agreement"</strong> refers to this Terms and
              Conditions document.
            </li>

            <li>
              <strong>"Site"</strong> refers to the website operated by FoReal.
            </li>

            <li>
              <strong>"App"</strong> refers to the mobile application of FoReal.
            </li>

            <li>
              <strong>"Platform"</strong> refers to the Site, App, and Services
              collectively.
            </li>

            <li>
              <strong>"User"</strong> refers to any person registering or using
              our services.
            </li>

            <li>
              <strong>"Lessor"</strong> refers to the user renting items.
            </li>

            <li>
              <strong>"Lessee"</strong> refers to the user renting items from
              the platform.
            </li>

            <li>
              <strong>"Rental Period"</strong> refers to the cost and duration
              of the rental.
            </li>

            <li>
              <strong>"Fees"</strong> refers to charges associated with
              services.
            </li>

            <li>
              <strong>"Content"</strong> refers to all data, images, or
              information on the platform.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
