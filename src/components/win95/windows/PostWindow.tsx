"use client";

import type { Post } from "@/types/post";
import { StatusBar, Well } from "../Chrome";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostWindow({ post }: { post: Post }) {
  return (
    <>
      <Well className="px-7 py-6">
        {/* Capped measure so a maximized window keeps a readable line length. */}
        <div className="max-w-[78ch]">
          <h1 className="text-[19px] font-bold leading-snug">{post.title}</h1>
          <p className="mt-1 text-[12px] text-[#555]">
            <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
            {post.readingTime}
          </p>
          <div className="my-4 h-[2px] bevel-groove" />
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
