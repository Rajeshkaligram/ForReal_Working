"use client";

export default function CookiePolicyPage() {
  return (
    <section className="py-8  md:py-16">
      <div className="container max-w-4xl! spacey-5 md:space-y-10">
        {/* TITLE */}
        <div className="space-y-2">
          <h1 className="font-serif! text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.01em] mb-8">Cookie Policy</h1>
          <p className="text-xs text-muted">Last updated: March 6, 2026</p>
        </div>

        {/* CONTENT */}
        <div className="space-y-8 text-[15.2px] text-muted leading-relaxed">
          <Section
            title="What Are Cookies"
            content="Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service."
          />

          <Section
            title="How We Use Cookies"
            content="We use cookies to authenticate users, remember your preferences, analyze site traffic, and improve our services. This includes both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period)."
          />

          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-medium text-black/60">
              Types of Cookies We Use
            </h2>

            <p>
              <span className="font-medium text-black/70">Essential Cookies:</span>{" "}
              Required for the website to function properly, including
              authentication and security.
            </p>

            <p>
              <span className="font-medium text-black/70">Analytics Cookies:</span>{" "}
              Help us understand how visitors interact with our website.
            </p>

            <p>
              <span className="font-medium text-black/70">
                Preference Cookies:
              </span>{" "}
              Remember your settings and preferences.
            </p>
          </div>

          <Section
            title="Managing Cookies"
            content="You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience and some features may no longer function properly."
          />

          <Section
            title="Third-Party Cookies"
            content="We may use third-party services that also use cookies. These third parties have their own privacy policies and cookie policies."
          />

          <Section
            title="Contact Us"
            content="If you have questions about our use of cookies, please contact us at info@foreal.ca."
          />
        </div>
      </div>
    </section>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl md:text-2xl font-medium text-black/60">{title}</h2>
      <p>{content}</p>
    </div>
  );
}
