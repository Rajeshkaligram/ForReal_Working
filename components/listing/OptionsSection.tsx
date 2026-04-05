import ToggleItem from "./ToggleItem";
import { useListingContext } from "./ListingContext";

export default function OptionsSection() {
  const { authEnabled, setAuthEnabled, cleaningEnabled, setCleaningEnabled } = useListingContext();

  return (
    <div className="space-y-4">
      <p className="text-[11px] tracking-[0.25em] uppercase text-muted">
        Item options
      </p>
      {/* <ToggleItem
        title="Instant booking"
        description="Allow bookings to be confirmed instantly without requiring approval."
        enabled={authEnabled}
        setEnabled={setAuthEnabled}
      /> */}

      <ToggleItem
        title="Authenticated item"
        description="Verify your item authenticity"
        enabled={authEnabled}
        setEnabled={setAuthEnabled}
      />

      <ToggleItem
        title="Professional cleaning fee"
        description="Add cleaning service to your listing"
        enabled={cleaningEnabled}
        setEnabled={setCleaningEnabled}
      />
    </div>
  );
}
