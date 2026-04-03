"use client";

export default function SafetyGuidelinesPage() {
  return (
    <section className="py-8  md:py-16">
      <div className="container max-w-4xl! space-y-5 md:space-y-10">

        {/* TITLE */}
        <h1 className="font-serif! text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.01em] mb-8">
          Safety Guidelines
        </h1>

        {/* INTRO */}
        <p className="text-sm text-muted leading-relaxed">
          At Foreal, your safety is our priority. We've established comprehensive
          guidelines to ensure a secure and trustworthy rental experience for all
          members of our community.
        </p>

        {/* SECTIONS */}
        <div className="space-y-8 text-[15.2px] text-muted leading-relaxed">

          <Section
            title="Verified Users"
            content="All users must verify their identity through our secure verification process. We use advanced authentication methods to ensure the safety and authenticity of our community members."
          />

          <Section
            title="Secure Transactions"
            content="All payments are processed through our secure platform. Never make payments outside of Foreal. Our payment system protects both renters and lenders with secure encryption and fraud protection."
          />

          <Section
            title="Damage Protection"
            content="Every rental is covered by our damage protection policy. If an item is damaged during a rental period, our team will assess the situation and provide appropriate compensation to the owner."
          />

          <Section
            title="Meeting Guidelines"
            content="When meeting to exchange items, choose public, well-lit locations. Consider bringing a friend and let someone know where you'll be. Use our in-app messaging system to coordinate exchanges."
          />

          <Section
            title="Reporting Issues"
            content="If you encounter any suspicious activity, inappropriate behavior, or safety concerns, report it immediately through our platform. Our trust and safety team investigates all reports promptly."
          />

          <Section
            title="Privacy Protection"
            content="Never share personal information such as your home address, phone number, or financial details outside of our secure platform. Keep all communications within the Foreal app."
          />

          <Section
            title="Contact Our Safety Team"
            content="For safety concerns or to report an issue, contact our dedicated safety team at info@foreal.ca or use the in-app reporting feature."
          />

        </div>

      </div>
    </section>
  );
}

/* 🔹 REUSABLE SECTION */
function Section({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl md:text-2xl font-medium text-black/60">
        {title}
      </h2>
      <p>{content}</p>
    </div>
  );
}