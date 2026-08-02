import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Page not found
        </h1>
        <p className="max-w-sm text-zinc-600">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>
        <Button href="/" className="mt-2">
          Back home
        </Button>
      </div>
    </Container>
  );
}
