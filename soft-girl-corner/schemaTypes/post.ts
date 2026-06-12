import {
  DocumentTextIcon,
  PackageIcon,
  StackCompactIcon,
} from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const postTypeLabels: Record<string, string> = {
  default: "Standard Article",
  feature: "Feature Story",
  guide: "Guide",
  roundup: "Product Roundup",
  softness: "Legacy Softness",
};

const layoutStyleLabels: Record<string, string> = {
  classic: "Classic",
  editorial: "Editorial",
  spotlight: "Spotlight",
};

const sectionLayoutLabels: Record<string, string> = {
  text: "Text Only",
  imageLeft: "Image Left",
  imageRight: "Image Right",
  spotlight: "Spotlight",
  checklist: "Checklist",
};

const richTextContent = [
  defineArrayMember({ type: "block" }),
  defineArrayMember({
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", type: "string", title: "Alt Text" })],
  }),
  defineArrayMember({ type: "cta" }),
];

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,

  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "layout", title: "Layout" },
    { name: "content", title: "Content" },
    { name: "products", title: "Products" },
  ],

  fields: [
    defineField({
      name: "postType",
      title: "Post Type",
      type: "string",
      description:
        "Choose the kind of story you are publishing. This controls the recommended editing fields and the starter template your client sees.",
      options: {
        list: [
          { title: "Standard Article", value: "default" },
          { title: "Feature Story", value: "feature" },
          { title: "Guide", value: "guide" },
          { title: "Product Roundup", value: "roundup" },
          { title: "Legacy Softness", value: "softness" },
        ],
        layout: "radio",
      },
      initialValue: "default",
      validation: (rule) => rule.required(),
      group: "basics",
    }),

    defineField({
      name: "layoutStyle",
      title: "Layout Style",
      type: "string",
      description:
        "Controls the visual presentation on the website without changing the content itself.",
      options: {
        list: [
          { title: "Classic", value: "classic" },
          { title: "Editorial", value: "editorial" },
          { title: "Spotlight", value: "spotlight" },
        ],
        layout: "radio",
      },
      initialValue: "classic",
      validation: (rule) => rule.required(),
      group: "layout",
    }),

    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (rule) => rule.required(),
      group: "basics",
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.required().error("Slug is required to publish."),
      group: "basics",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "basics",
    }),

    defineField({
      name: "date",
      type: "datetime",
      title: "Published Date",
      description:
        "Use this to control publishing order on the website. It defaults to today's date in the post templates.",
      group: "basics",
    }),

    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      rows: 3,
      description:
        "Short summary used on blog cards, social previews, and internal search.",
      validation: (rule) => rule.required().min(20).max(220),
      group: "basics",
    }),

    defineField({
      name: "mainImage",
      type: "image",
      title: "Cover Image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      description:
        "Primary image used on article cards and simple article layouts.",
      group: "layout",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image Override",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      description:
        "Optional large-format image for feature, guide, and roundup layouts.",
      group: "layout",
    }),

    defineField({
      name: "subHeadline",
      title: "Sub Headline",
      type: "string",
      description:
        "Optional supporting headline shown beneath the title in richer layouts.",
      group: "layout",
    }),

    defineField({
      name: "intro",
      title: "Intro",
      type: "markdown",
      description:
        "Use this for a short opening note, scene-setting paragraph, or editorial lead-in.",
      group: "content",
    }),

    defineField({
      name: "content",
      type: "array",
      title: "Main Body",
      of: richTextContent,
      description:
        "Flexible rich text body for standard articles and any long-form sections you want between feature blocks.",
      group: "content",
    }),

    defineField({
      name: "contentSections",
      title: "Flexible Sections",
      type: "array",
      description:
        "Optional modular sections for feature stories, guides, and richer editorial layouts.",
      of: [
        defineArrayMember({
          name: "contentSection",
          type: "object",
          title: "Section",
          icon: StackCompactIcon,
          fields: [
            defineField({
              name: "layout",
              title: "Section Layout",
              type: "string",
              options: {
                list: [
                  { title: "Text Only", value: "text" },
                  { title: "Image Left", value: "imageLeft" },
                  { title: "Image Right", value: "imageRight" },
                  { title: "Spotlight", value: "spotlight" },
                  { title: "Checklist", value: "checklist" },
                ],
              },
              initialValue: "text",
            }),
            defineField({
              name: "eyebrow",
              type: "string",
              title: "Eyebrow",
              description: "Small label shown above the section heading.",
            }),
            defineField({
              name: "heading",
              type: "string",
              title: "Section Heading",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              type: "markdown",
              title: "Section Body",
            }),
            defineField({
              name: "checklist",
              type: "array",
              title: "Checklist Items",
              of: [defineArrayMember({ type: "string" })],
              hidden: ({ parent }) => parent?.layout !== "checklist",
            }),
            defineField({
              name: "image",
              type: "image",
              title: "Section Image",
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.layout === "text" || parent?.layout === "checklist",
            }),
            defineField({
              name: "cta",
              type: "cta",
              title: "Section CTA",
            }),
          ],
          preview: {
            select: {
              title: "heading",
              subtitle: "layout",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Untitled section",
                subtitle:
                  subtitle && subtitle in sectionLayoutLabels
                    ? sectionLayoutLabels[subtitle]
                    : subtitle || "Section",
                media,
              };
            },
          },
        }),
      ],
      group: "content",
    }),

    defineField({
      name: "outro",
      title: "Outro",
      type: "markdown",
      description:
        "Optional closing section for wrap-up thoughts, encouragement, or a final CTA.",
      group: "content",
    }),

    defineField({
      name: "productHeader",
      title: "Product Section Intro",
      type: "markdown",
      description:
        "Optional lead-in before any product recommendations or affiliate roundups.",
      group: "products",
    }),

    defineField({
      name: "showAffiliateDisclosure",
      title: "Show Affiliate Disclosure",
      type: "boolean",
      initialValue: false,
      group: "products",
    }),

    defineField({
      name: "recommendedProducts",
      title: "Recommended Products",
      type: "array",
      description:
        "Optional curated product sections for recommendation posts, buyer guides, or embedded shopping picks.",
      of: [
        defineArrayMember({
          name: "productSection",
          type: "object",
          title: "Product Section",
          icon: PackageIcon,
          fields: [
            defineField({
              name: "sectionTitle",
              type: "string",
              title: "Section Title",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "products",
              type: "array",
              validation: (rule) => rule.min(1),
              of: [
                defineArrayMember({
                  name: "productCard",
                  type: "object",
                  title: "Product",
                  fields: [
                    defineField({
                      name: "name",
                      type: "string",
                      title: "Product Name",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "url",
                      type: "url",
                      title: "Product URL",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "description",
                      type: "text",
                      rows: 3,
                      title: "Description",
                    }),
                    defineField({
                      name: "image",
                      type: "image",
                      title: "Product Image",
                      options: { hotspot: true },
                    }),
                  ],
                  preview: {
                    select: {
                      title: "name",
                      subtitle: "url",
                      media: "image",
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "sectionTitle",
              subtitle: "products.0.name",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Product section",
                subtitle: subtitle ? `Starts with ${subtitle}` : "No products yet",
              };
            },
          },
        }),
      ],
      group: "products",
    }),
  ],
  preview: {
    select: {
      title: "title",
      postType: "postType",
      layoutStyle: "layoutStyle",
      media: "mainImage",
    },
    prepare({ title, postType, layoutStyle, media }) {
      const typeLabel = postTypeLabels[postType] || "Post";
      const layoutLabel = layoutStyleLabels[layoutStyle] || "Classic";

      return {
        title: title || "Untitled post",
        subtitle: `${typeLabel} • ${layoutLabel}`,
        media,
      };
    },
  },
});
