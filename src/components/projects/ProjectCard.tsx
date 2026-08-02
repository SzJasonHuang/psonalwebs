import { Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col justify-between gap-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-zinc-900">{project.title}</h3>
        <p className="text-sm leading-6 text-zinc-600">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="flex items-center gap-4 text-sm font-medium text-zinc-600">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-accent"
          >
            <Code2 className="size-4" />
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-accent"
          >
            <ExternalLink className="size-4" />
            Live
          </a>
        )}
      </div>
    </Card>
  );
}
