export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  readingTime: string;
};

export type Post = PostMeta & {
  html: string;
};
