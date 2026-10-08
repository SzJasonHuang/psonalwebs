/**
 * The desktop shell is rendered per-page (each route opens a different
 * window), so this group only exists to keep the routes grouped.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
