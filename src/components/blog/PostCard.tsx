import Link from "next/link";
import type { PostMeta } from "@/types/post";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-transparent p-6 -mx-6 transition-colors duration-150 hover:border-zinc-200 hover:bg-white"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </div>
      <h2 className="mt-2 text-lg font-semibold text-zinc-900 transition-colors duration-150 group-hover:text-accent">
        {post.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        {post.description}
      </p>
    </Link>
  );
}
