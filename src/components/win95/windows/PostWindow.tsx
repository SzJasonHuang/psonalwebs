"use client";

import type { Post } from "@/types/post";
import { StatusBar, Well } from "../Chrome";

function formatDate(date: string) {
  // "2026-07-11" parses as UTC midnight; format in UTC too, or it shows as
  // the previous day anywhere west of Greenwich.
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function PostWindow({ post }: { post: Post }) {
  return (
    <>
      <Well className="px-10 py-8">
        {/* Capped measure, centred, so a maximized window keeps a readable
            line length. Matches the resume window: the cap is in ch, so it
            scales with the 22px base size set here. */}
        <div className="mx-auto max-w-[96ch] text-[22px]">
          <h1 className="text-[40px] font-bold leading-snug">{post.title}</h1>
          <p className="mt-2 text-[19px] text-[#555]">
            <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
            {post.readingTime}
          </p>
          <div className="my-6 h-[2px] bevel-groove" />
          <div
            className="doc-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </Well>
      <StatusBar panels={[formatDate(post.date), post.readingTime]} />
    </>
  );
}
