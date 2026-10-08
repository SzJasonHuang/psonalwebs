import type { Metadata } from "next";
import { Win95Shell } from "@/components/win95/Win95Shell";
import { getAllPostsWithHtml } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software, projects, and things I'm learning.",
};

export default async function BlogPage() {
  const posts = await getAllPostsWithHtml();
  return <Win95Shell posts={posts} initial={{ kind: "blog" }} />;
}
