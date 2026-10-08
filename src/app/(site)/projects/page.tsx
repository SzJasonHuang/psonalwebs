import type { Metadata } from "next";
import { Win95Shell } from "@/components/win95/Win95Shell";
import { getAllPostsWithHtml } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of things I've built.",
};

export default async function ProjectsPage() {
  const posts = await getAllPostsWithHtml();
  return <Win95Shell posts={posts} initial={{ kind: "projects" }} />;
}
