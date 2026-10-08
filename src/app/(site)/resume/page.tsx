import type { Metadata } from "next";
import { Win95Shell } from "@/components/win95/Win95Shell";
import { getAllPostsWithHtml } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Resume",
  description: "Work experience, education, and skills.",
};

export default async function ResumePage() {
  const posts = await getAllPostsWithHtml();
  return <Win95Shell posts={posts} initial={{ kind: "resume" }} />;
}
