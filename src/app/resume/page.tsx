import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceItem } from "@/components/resume/ExperienceItem";
import { EducationItem } from "@/components/resume/EducationItem";
import { SkillsList } from "@/components/resume/SkillsList";
import { experience, education, skills } from "@/data/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "Work experience, education, and skills.",
};

export default function ResumePage() {
  return (
    <Container>
      <div className="py-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Resume
          </h1>
          <Button href="/resume.pdf" download>
            <Download className="size-4" />
            Download PDF
          </Button>
        </div>

        <div className="mt-16 space-y-14">
          <section className="space-y-6">
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-10">
              {experience.map((entry) => (
                <ExperienceItem key={`${entry.company}-${entry.role}`} entry={entry} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-10">
              {education.map((entry) => (
                <EducationItem key={entry.school} entry={entry} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeading>Skills</SectionHeading>
            <SkillsList groups={skills} />
          </section>
        </div>
      </div>
    </Container>
  );
}
