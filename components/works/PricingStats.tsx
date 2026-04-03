// components/PricingStats.tsx

export default function PricingStats() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 ">
      <div
        className="border border-border bg-muted/10 overflow-hidden
      "
      >
        <div
          className="
          grid 
          grid-cols-
          md:grid-cols-3 
          
        "
        >
          {/* Column 1 - Average monthly per piece */}
          <div className="px-4 md:px-8 py-6 sm:py-12 xl:py-14 text-center">
            <div className="text-3xl md:text-5xl font-serif  tracking-tight text-primary">
              $150
              <span className="text-3xl md:text-4xl font-normal">.00</span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted font-medium">
              AVG. MONTHLY PER PIECE
            </p>
          </div>

          {/* Column 2 - Platform fee */}
          <div className="px-4 md:px-8 py-6 sm:py-12 xl:py-16 text-center">
            <div className="text-3xl md:text-5xl font-serif  tracking-tight text-primary">
              15<span className="text-3xl md:text-4xl font-normal">%</span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted font-medium">
              PLATFORM FEE
            </p>
          </div>

          {/* Column 3 - Payment processing */}
          <div className="px-4 md:px-8 py-6 sm:py-12 xl:py-16 text-center">
            <div className="text-3xl md:text-5xl font-serif  tracking-tight text-primary">
              24<span className="text-3xl md:text-4xl font-normal">h</span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted font-medium">
              PAYMENT PROCESSING
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
