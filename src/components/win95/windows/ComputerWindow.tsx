"use client";

import { site } from "@/data/site";
import { Button95, GroupBox, StatusBar, Well } from "../Chrome";
import { ComputerIcon } from "../Icons";

const SYSTEM = [
  ["Operating System", "Portfolio 95"],
  ["Registered To", site.name],
  ["Location", site.location],
  ["Status", "Open to new grad & internship roles"],
];

export function ComputerWindow() {
  return (
    <>
      <Well className="px-6 py-5">
        <div className="flex items-start gap-4">
          <ComputerIcon className="size-8 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-[17px] font-bold">My Computer</h1>
            <p className="text-[13px] text-[#444]">System Properties</p>
          </div>
        </div>

        <GroupBox label="System" className="mt-4">
          <dl className="space-y-1 text-[13px]">
            {SYSTEM.map(([term, value]) => (
              <div key={term} className="flex flex-wrap gap-x-2">
                <dt className="w-[130px] shrink-0 font-bold">{term}:</dt>
                <dd className="min-w-0 flex-1">{value}</dd>
              </div>
            ))}
          </dl>
        </GroupBox>

        <GroupBox label="Contact" className="mt-4">
          <div className="flex flex-wrap gap-2 pt-1">
            {site.social.map((link) => (
              <Button95 key={link.href} href={link.href}>
                {link.label}
              </Button95>
            ))}
          </div>
        </GroupBox>
      </Well>
      <StatusBar panels={[site.email, "Ready"]} />
    </>
  );
}
