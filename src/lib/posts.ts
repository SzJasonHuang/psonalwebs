import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTimeFn from "reading-time";
import { markdownToHtml } from "./markdown";
import type { Post, PostMeta } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

type Frontmatter = {
  title: string;
  date: string;
  description: string;
};

function getSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as Frontmatter, content };
}

export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map((slug) => {
      const { data, content } = readPostFile(slug);
      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        readingTime: readingTimeFn(content).text,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!getSlugs().includes(slug)) {
    return null;
  }

  const { data, content } = readPostFile(slug);
  const html = await markdownToHtml(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    readingTime: readingTimeFn(content).text,
    html,
  };
}
