export function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
      {children}
    </h2>
  );
}
