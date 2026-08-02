import type { ExperienceEntry } from "@/data/resume";

export function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="border-l-2 border-zinc-200 pl-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium text-zinc-900">
          {entry.role} ·{" "}
          {entry.companyUrl ? (
            <a
              href={entry.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-accent"
            >
              {entry.company}
            </a>
          ) : (
            entry.company
          )}
        </h3>
        <span className="text-sm text-zinc-500">
          {entry.start} — {entry.end}
        </span>
      </div>
      <p className="mt-0.5 text-sm text-zinc-500">{entry.location}</p>
      <ul className="mt-3 space-y-2">
        {entry.bullets.map((bullet) => (
          <li key={bullet} className="text-sm leading-6 text-zinc-600">
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
