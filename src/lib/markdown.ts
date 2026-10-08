import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import type { Element, Root, RootContent } from "hast";

/** A paragraph whose only real content is an image, e.g. `![alt](/x.jpg)`. */
function isImageParagraph(node: RootContent): node is Element {
  if (node.type !== "element" || node.tagName !== "p") return false;
  const content = node.children.filter(
    (child) => child.type !== "text" || child.value.trim() !== ""
  );
  return (
    content.length === 1 &&
    content[0].type === "element" &&
    content[0].tagName === "img"
  );
}

/**
 * Promotes standalone images to `<figure>`, using the markdown title as the
 * caption: `![alt](/x.jpg "caption")`. Keeps captions in the source file
 * rather than requiring raw HTML, which this pipeline strips.
 */
function rehypeFigure() {
  return (tree: Root) => {
    tree.children = tree.children.map((node) => {
      if (!isImageParagraph(node)) return node;

      const img = node.children.find(
        (child): child is Element => child.type === "element"
      )!;
      const caption = img.properties.title;
      delete img.properties.title;

      const children: Element[] = [img];
      if (typeof caption === "string" && caption !== "") {
        children.push({
          type: "element",
          tagName: "figcaption",
          properties: {},
          children: [{ type: "text", value: caption }],
        });
      }

      return { type: "element", tagName: "figure", properties: {}, children };
    });
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeFigure)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}
