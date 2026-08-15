import { PortableText } from "next-sanity";
import type { PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";

import { urlFor } from "@/app/(root)/blog/image";
import { cn } from "@/lib/utils";

type RichTextProps = {
  className?: string;
  defaultImageAlt?: string;
  value: TypedObject[];
};

const imageSizeClasses: Record<string, string> = {
  small: "max-w-[420px]",
  medium: "max-w-[680px]",
  large: "max-w-[900px]",
  full: "max-w-full",
};

const imageAlignmentClasses: Record<string, string> = {
  center: "mx-auto",
  left: "mr-auto",
  right: "ml-auto",
};

const imageFitClasses: Record<string, string> = {
  contain: "max-h-[560px] object-contain",
  cover: "h-[420px] max-h-[70vh] object-cover sm:h-[520px]",
};

function getImageUrl(value: any) {
  if (typeof value?.url === "string") {
    return value.url;
  }

  return urlFor(value)?.width(1200).auto("format").url();
}

export function createRichTextComponents(
  defaultImageAlt = "Content image"
): PortableTextComponents {
  return {
    block: {
      h1: ({ children }) => (
        <h1 className="mt-12 text-4xl font-extrabold leading-tight text-[#242836] sm:text-5xl">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="mt-10 text-3xl font-extrabold leading-tight text-[#242836] sm:text-4xl">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-8 text-2xl font-bold leading-tight text-[#242836] sm:text-3xl">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="mt-7 text-xl font-bold leading-tight text-[#242836] sm:text-2xl">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="mt-6 text-lg font-bold leading-tight text-[#242836]">
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="mt-6 text-base font-bold uppercase tracking-[0.16em] text-[#6f5560]">
          {children}
        </h6>
      ),
      normal: ({ children }) => (
        <p className="text-lg leading-9 text-[#252838]">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-[#e6b7c4] bg-[#fff6f8] px-5 py-4 text-lg italic leading-8 text-[#5f4851]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-6 list-disc space-y-3 pl-6 text-lg leading-8 text-[#252838]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-6 list-decimal space-y-3 pl-6 text-lg leading-8 text-[#252838]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="pl-1 marker:text-[#b15b73]">{children}</li>
      ),
      number: ({ children }) => (
        <li className="pl-1 marker:font-semibold marker:text-[#b15b73]">
          {children}
        </li>
      ),
    },
    marks: {
      code: ({ children }) => (
        <code className="rounded-md bg-[#f5edf0] px-1.5 py-0.5 font-mono text-sm text-[#7d3f52]">
          {children}
        </code>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => {
        const href = value?.href ?? "#";
        const isExternal = href.startsWith("http");

        return (
          <a
            href={href}
            className="font-medium text-[#a54f68] underline decoration-[#e8b8c5] underline-offset-4 transition hover:text-[#7f374d]"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      },
      strong: ({ children }) => (
        <strong className="font-bold text-[#242836]">{children}</strong>
      ),
      underline: ({ children }) => (
        <span className="underline decoration-[#e8b8c5] underline-offset-4">
          {children}
        </span>
      ),
    },
    types: {
      cta: ({ value }) => (
        <div className="my-8 rounded-2xl border border-[#efccd5] bg-[#fff5f7] p-6">
          {value?.heading || value?.label ? (
            <h3 className="text-xl font-bold text-[#3d2630]">
              {value.heading || value.label}
            </h3>
          ) : null}
          {value?.text ? (
            <p className="mt-3 text-base leading-7 text-[#6f5560]">
              {value.text}
            </p>
          ) : null}
          {value?.link ? (
            <a
              href={value.link}
              className="mt-5 inline-flex rounded-full bg-[#a54f68] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8f4258]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {value.label || "Learn more"}
            </a>
          ) : null}
        </div>
      ),
      image: ({ value }) => {
        const imageUrl = getImageUrl(value);
        const displaySize = value?.displaySize ?? "large";
        const alignment = value?.alignment ?? "center";
        const fit = value?.fit ?? "contain";
        const sizeClass =
          imageSizeClasses[displaySize] ?? imageSizeClasses.large;
        const alignmentClass =
          imageAlignmentClasses[alignment] ?? imageAlignmentClasses.center;
        const fitClass = imageFitClasses[fit] ?? imageFitClasses.contain;

        if (!imageUrl) {
          return null;
        }

        return (
          <figure className={cn("my-10 w-full", sizeClass, alignmentClass)}>
            <img
              alt={value?.alt ?? defaultImageAlt}
              className={cn(
                "mx-auto w-full rounded-2xl border border-[#eee6e8] bg-[#fffaf8] shadow-sm",
                fitClass
              )}
              src={imageUrl}
            />
            {value?.caption ? (
              <figcaption className="mt-3 text-center text-sm text-[#806873]">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      table: ({ value }) => {
        if (!value?.rows?.length) {
          return null;
        }

        return (
          <div className="my-8 overflow-x-auto rounded-2xl border border-[#eadde1]">
            <table className="w-full min-w-[520px] border-collapse bg-white text-left text-sm">
              <tbody>
                {value.rows.map((row: any, rowIndex: number) => (
                  <tr key={row._key ?? rowIndex} className="border-b border-[#f0e5e8] last:border-b-0">
                    {row.cells.map((cell: string, cellIndex: number) => (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className="border-r border-[#f0e5e8] p-3 text-[#35252d] last:border-r-0"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
    },
  };
}

export const richTextComponents = createRichTextComponents();

export default function RichText({
  className,
  defaultImageAlt,
  value,
}: RichTextProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <PortableText
        value={value}
        components={createRichTextComponents(defaultImageAlt)}
      />
    </div>
  );
}
