import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of things I've built.",
};

export default function ProjectsPage() {
  return (
    <Container wide>
      <div className="py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Projects
        </h1>
        <p className="mt-3 max-w-xl text-zinc-600">
          A selection of things I&apos;ve built, from side projects to tools
          I use daily.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </Container>
  );
}
