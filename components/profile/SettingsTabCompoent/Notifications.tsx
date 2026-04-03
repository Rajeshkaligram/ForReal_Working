"use client";

import Section from "./Section";
import ToggleSwitch from "./ToggleSwitch";

export default function Notifications() {
  return (
    <Section title="NOTIFICATIONS" >
      <div className="flex justify-between text-sm p-5 border-b">
        <div>
          <p>Email notifications</p>
          <p className="text-xs text-muted">Rental updates, messages</p>
        </div>
        <ToggleSwitch defaultOn />
      </div>

      <div className="flex justify-between text-sm p-5 border-b">
        <div>
          <p>Push notifications</p>
          <p className="text-xs text-muted">Real-time alerts</p>
        </div>
        <ToggleSwitch defaultOn />
      </div>

      <div className="flex justify-between text-sm p-5">
        <div>
          <p>Marketing emails</p>
          <p className="text-xs text-muted">Promotions</p>
        </div>
        <ToggleSwitch />
      </div>
    </Section>
  );
}
