import { defineField, defineType } from "sanity";

export const ctaType = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Supporting Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "label",
      title: "Button Label",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link URL",
      type: "url",
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Button", value: "button" },
          { title: "Highlight", value: "highlight" },
          { title: "Plain", value: "plain" },
        ],
      },
      initialValue: "button",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      label: "label",
      text: "text",
    },
    prepare({ heading, label, text }) {
      return {
        title: heading || label || "Call to action",
        subtitle: text || "Linked content block",
      };
    },
  },
});
