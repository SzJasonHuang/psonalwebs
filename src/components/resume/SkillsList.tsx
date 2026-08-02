import type { SkillGroup } from "@/data/resume";
import { Badge } from "@/components/ui/Badge";

export function SkillsList({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.category} className="flex flex-wrap items-baseline gap-3">
          <span className="w-full shrink-0 text-sm font-medium text-zinc-900 sm:w-36">
            {group.category}
          </span>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
