import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PostCard } from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software, projects, and things I'm learning.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <div className="py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Blog
        </h1>
        <p className="mt-3 max-w-xl text-zinc-600">
          Notes on software, projects, and things I&apos;m learning along the
          way.
        </p>

        <div className="mt-12 divide-y divide-zinc-200">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Container>
  );
}
