export default function OverviewTab({ setTab }: { setTab: any }) {
  const handleTabChange = (t: string) => {
    window.scrollTo({
      top: 20,
      behavior: "smooth",
    });
    setTab(t);
  };

  return (
    <div className="space-y-4 md:space-y-8 container">
      {/* ABOUT */}
      <div className="border border-border p-3 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs tracking-widest text-muted font-medium">
            ABOUT
          </p>
          <button className="text-xs tracking-widest text-muted font-medium hover:text-black cursor-pointer">
            EDIT
          </button>
        </div>

        <p className="text-sm text-muted leading-6">
          Fashion enthusiast and curator based in London. I love discovering
          unique pieces and sharing them with others who appreciate quality
          design. My closet is a mix of contemporary designers, vintage finds,
          and timeless classics. I take excellent care of my pieces and expect
          the same in return.
        </p>
      </div>

      {/* GRID SECTION */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* CURRENTLY RENTING */}
        <div className="border border-border p-3 md:p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs tracking-widest text-muted font-medium mb-6">
              CURRENTLY RENTING
            </p>

            {/* ITEM 1 */}
            <div className="flex gap-4 mb-5">
              <img
                src="/assets/images/p1.jpeg"
                alt="bag"
                className="w-16 h-16 object-cover"
              />
              <div>
                <p className="text-[10px] tracking-widest text-muted">
                  THE ROW
                </p>
                <p className="text-sm font-medium">Margaux Leather Tote</p>
                <p className="text-xs text-muted">Return by 12 Mar</p>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex gap-4">
              <img
                src="/assets/images/style2.jpeg"
                alt="bag"
                className="w-16 h-16 object-cover"
              />
              <div>
                <p className="text-[10px] tracking-widest text-muted">
                  BOTTEGA VENETA
                </p>
                <p className="text-sm font-medium">Jodie Mini Bag</p>
                <p className="text-xs text-muted">Return by 15 Mar</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleTabChange("renting")}
            className="mt-6 border border-border py-3 text-xs tracking-widest text-muted font-medium hover:bg-black hover:text-white transition  cursor-pointer"
          >
            VIEW ALL RENTALS
          </button>
        </div>

        {/* SAVED PIECES */}
        <div className="border border-border p-3 md:p-6">
          <p className="text-xs tracking-widest text-muted font-medium mb-6">
            SAVED PIECES
          </p>

          <p className="text-sm text-muted">
            No saved pieces yet. Start browsing to add favorites.
          </p>
        </div>

        {/* RECENT REVIEWS */}
        <div className="border border-border p-3 md:p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs tracking-widest text-muted font-medium mb-6">
              RECENT REVIEWS
            </p>

            {/* REVIEW 1 */}
            <div className="mb-5">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Sophie M.</p>
                <p className="text-black">★★★★★</p>
              </div>
              <p className="text-sm text-muted mt-2 leading-5">
                "The piece was exactly as described — immaculate condition.
                Delivery was fast and returns were hassle-free."
              </p>
            </div>

            {/* REVIEW 2 */}
            <div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Ines K.</p>
                <p className="text-black">★★★★★</p>
              </div>
              <p className="text-sm text-muted mt-2 leading-5">
                "Beautiful bag, well packaged and great communication
                throughout. Felt like borrowing from a very stylish friend."
              </p>
            </div>
          </div>

          <button
            onClick={() => handleTabChange("reviews")}
            className="mt-6 border border-border py-3 text-xs tracking-widest text-muted font-medium hover:bg-black hover:text-white transition cursor-pointer"
          >
            SEE ALL REVIEWS
          </button>
        </div>
      </div>
    </div>
  );
}
