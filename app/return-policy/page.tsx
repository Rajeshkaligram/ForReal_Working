"use client";

export default function ReturnPolicyPage() {
  return (
    <section className="py-8  md:py-16">
      <div className="container max-w-4xl! space-y-5 md:space-y-10">
        {/* TITLE */}
        <h1 className="font-serif! text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.01em] mb-8">Return Policy</h1>

        {/* INTRO */}
        <div className="space-y-4 text-[15.2px] text-muted leading-relaxed">
          <p>
            We are confident in the FoReal experience. However, if the item
            received is damaged, or if the item does not look like the picture
            displayed on the Platform, the client should complete the
            appropriate form on the Platform and return the item to the Business
            Partner. Upon submitting the appropriate forms, the client shall
            receive the refund of the Rental Period Fees (if applicable). FoReal
            Fees shall not be refunded.
          </p>

          <p>
            The client may submit a complaint and ask for a refund within
            twenty-four (24) hours after receipt of the items, otherwise the
            items are considered as flawless.
          </p>
        </div>

        {/* HOW TO RETURN */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">How to Initiate a Return</h2>

          <p className="text-sm text-muted">
            If you need to return an item, please follow these steps:
          </p>

          <ul className="text-sm text-muted space-y-2 list-disc pl-5">
            <li>Log into your FoReal account</li>
            <li>Navigate to your rental history</li>
            <li>Select the item you wish to return</li>
            <li>
              Complete the return form, providing details and photos if
              applicable
            </li>
            <li>Submit the form within 24 hours of receiving the item</li>
          </ul>
        </div>

        {/* REFUND */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Refund Processing</h2>

          <div className="text-sm text-muted space-y-3 leading-relaxed">
            <p>
              Once your return request has been approved and the item has been
              returned to the Business Partner, your refund will be processed.
              The Rental Period Fees will be refunded to your original payment
              method. Please note that FoReal service fees are non-refundable.
            </p>

            <p>
              Refunds typically take 5–10 business days to appear in your
              account, depending on your financial institution.
            </p>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-3">
          <h2 className="text-xl font-medium">Questions?</h2>

          <p className="text-sm text-muted">
            If you have any questions about our return policy, please contact us
            at <span className="underline cursor-pointer">info@foreal.ca</span>{" "}
            or visit our{" "}
            <span className="underline cursor-pointer">FAQ page</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
