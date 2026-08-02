import type { EducationEntry } from "@/data/resume";

export function EducationItem({ entry }: { entry: EducationEntry }) {
  return (
    <div className="border-l-2 border-zinc-200 pl-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium text-zinc-900">{entry.school}</h3>
        <span className="text-sm text-zinc-500">
          {entry.start} — {entry.end}
        </span>
      </div>
      <p className="mt-0.5 text-sm text-zinc-500">{entry.location}</p>
      <p className="mt-1 text-sm text-zinc-600">{entry.degree}</p>
      {entry.bullets && (
        <ul className="mt-3 space-y-2">
          {entry.bullets.map((bullet) => (
            <li key={bullet} className="text-sm leading-6 text-zinc-600">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
