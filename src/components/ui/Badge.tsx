export function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
      {children}
    </span>
  );
}
