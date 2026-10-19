import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

// Typography for project write-ups (src/content/projects/*.mdx).
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 text-[26px] font-extrabold tracking-[-0.02em] first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-bold">{children}</h3>,
  p: ({ children }) => <p className="mb-5 text-lg leading-[1.7] text-foreground/85">{children}</p>,
  ul: ({ children }) => <ul className="mb-5 flex list-disc flex-col gap-2 pl-5 text-lg leading-[1.6] text-foreground/85">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 flex list-decimal flex-col gap-2 pl-5 text-lg leading-[1.6] text-foreground/85">{children}</ol>,
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  code: ({ children }) => <code className="bg-card px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-accent pl-5 text-xl font-medium [&_p]:text-foreground">{children}</blockquote>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} className="my-8 w-full border border-rule" loading="lazy" />
  ),
  Figure,
};

// <Figure caption="…" src="/writeups/…png" alt="…" /> — or with `placeholder` while the image is pending.
function Figure({ src, alt, caption, placeholder }: { src?: string; alt?: string; caption?: ReactNode; placeholder?: string }) {
  return (
    <figure className="my-8 flex flex-col gap-2.5">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ""} className="w-full border border-rule" loading="lazy" />
      ) : (
        <div className="label flex h-56 items-center justify-center border border-dashed border-rule bg-card px-6 text-center">
          [Image: {placeholder}]
        </div>
      )}
      {caption && <figcaption className="text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function useMDXComponents(): MDXComponents {
  return components;
}
