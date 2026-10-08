import { Win95Shell } from "@/components/win95/Win95Shell";
import { getAllPostsWithHtml } from "@/lib/posts";

export default async function DesktopPage() {
  const posts = await getAllPostsWithHtml();
  return <Win95Shell posts={posts} />;
}
