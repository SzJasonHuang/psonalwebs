import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export default function Home() {
  return (
    <Container>
      <section className="flex min-h-[70vh] flex-col justify-center gap-6 py-24">
        <p className="text-sm font-medium text-accent">{site.location}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          {site.name}
        </h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600">
          {site.tagline}{" "}
          <span>
            I care about clean interfaces, dependable systems, and writing
            code that&apos;s easy for the next person to read — currently
            building at KKC Classroom and TAing systems programming at UBC.
          </span>
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href="/resume">View Resume</Button>
          <Button href="/projects" variant="secondary">
            View Projects
          </Button>
        </div>
      </section>
    </Container>
  );
}
