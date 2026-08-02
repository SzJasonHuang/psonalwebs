---
title: "Building This Site"
date: "2026-02-03"
description: "A quick look at the stack behind this site: Next.js, Tailwind, and markdown for the blog."
---

A short note on how this site is put together, in case it's useful to anyone else setting up something similar.

## Stack

- **Next.js** (App Router) for pages and static generation
- **Tailwind CSS** for styling, kept to a small neutral palette plus one accent color
- **Markdown files** for blog posts, parsed with `gray-matter` and rendered through a small `remark`/`rehype` pipeline

## Why markdown over a CMS

For a personal blog with a handful of posts, a CMS is more infrastructure than the problem needs. Markdown files live in the repo, are easy to edit, and deploy with everything else — no extra services to keep running.

```ts
const pipeline = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify);
```

That's most of the rendering logic in one line.
