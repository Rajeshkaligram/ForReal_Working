"use client";

export default function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      {title && (
        <p className="text-xs tracking-widest text-muted font-medium uppercase">{title}</p>
      )}

      <div className="bg-white">{children}</div>
    </div>
  );
}
