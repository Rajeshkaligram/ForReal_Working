import ToggleItem from "./ToggleItem";

export default function OptionsSection({
  authEnabled,
  setAuthEnabled,
  cleaningEnabled,
  setCleaningEnabled,
}: {
  authEnabled: boolean;
  setAuthEnabled: (v: boolean) => void;
  cleaningEnabled: boolean;
  setCleaningEnabled: (v: boolean) => void;
}) {
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
