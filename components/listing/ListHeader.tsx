export default function ListHeader() {
  return (
    <div className="space-y-6 max-w-3xl mb-6 md:mb-12">
      {/* SMALL LABEL */}
      <p className="sec_tagline">Add a listing</p>

      {/* TITLE */}
      <h1 className="font-serif! sec_title text-black">
        Your wardrobe <br />
        <span className="italic font-light">earns now.</span>
      </h1>

      {/* DESCRIPTION */}
      <p className="sec_details">
        List a designer or premium piece in under five minutes. You approve
        every booking — your piece, your rules.
      </p>
    </div>
  );
}
