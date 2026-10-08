import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Win95Shell } from "@/components/win95/Win95Shell";
import { getAllPosts, getAllPostsWithHtml, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllPostsWithHtml();

  if (!posts.some((post) => post.slug === slug)) {
    notFound();
  }

  return <Win95Shell posts={posts} initial={{ kind: "post", slug }} />;
}
