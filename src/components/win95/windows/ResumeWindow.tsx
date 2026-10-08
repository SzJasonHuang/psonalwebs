"use client";

import { education, experience, skills } from "@/data/resume";
import { Button95, StatusBar, Well } from "../Chrome";

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-2 bg-w95-navy px-2 py-[3px] text-[13px] font-bold uppercase tracking-wide text-white">
      {children}
    </h2>
  );
}

export function ResumeWindow() {
  return (
    <>
      <Well className="px-6 py-5">
        {/* Capped measure so a maximized window doesn't stretch lines across
            the full width of a wide monitor. */}
        <div className="max-w-[86ch]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-[17px] font-bold">Resume</h1>
            <Button95 href="/resume.pdf" download>
              Download PDF
            </Button95>
          </div>

          <section className="mb-5">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-4">
              {experience.map((entry) => (
                <article key={`${entry.company}-${entry.role}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-[13px] font-bold">{entry.role}</h3>
                    <span className="text-[12px] text-[#555]">
                      {entry.start} - {entry.end}
                    </span>
                  </div>
                  <p className="text-[13px] italic text-[#333]">
                    {entry.companyUrl ? (
                      <a
                        href={entry.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-w95-navy underline hover:text-w95-blue"
                      >
                        {entry.company}
                      </a>
                    ) : (
                      entry.company
                    )}
                    {entry.companySuffix && `, ${entry.companySuffix}`}
                    {" · "}
                    {entry.location}
                  </p>
                  <ul className="mt-1.5 space-y-1 pl-5 text-[13px] leading-relaxed [list-style-type:square]">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-5">
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-4">
              {education.map((entry) => (
                <article key={entry.school}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-[13px] font-bold">{entry.school}</h3>
                    <span className="text-[12px] text-[#555]">
                      {entry.start} - {entry.end}
                    </span>
                  </div>
                  <p className="text-[13px] italic text-[#333]">
                    {entry.degree} · {entry.location}
                  </p>
                  {entry.bullets && (
                    <ul className="mt-1.5 space-y-1 pl-5 text-[13px] leading-relaxed [list-style-type:square]">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Skills</SectionTitle>
            <dl className="space-y-2">
              {skills.map((group) => (
                <div key={group.category} className="text-[13px]">
                  <dt className="font-bold">{group.category}</dt>
                  <dd className="leading-relaxed">{group.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </Well>
      <StatusBar
        panels={[
          `${experience.length} position(s)`,
          `${skills.reduce((n, g) => n + g.items.length, 0)} skills`,
        ]}
      />
    </>
  );
}
