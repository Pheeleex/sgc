import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Lifestyle", value: "lifestyle" },
          { title: "Hair Care", value: "haircare" },
          { title: "Skin Care", value: "skincare" },
          { title: "Wellness", value: "wellness" },
          { title: "Faith", value: "faith" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accessType",
      title: "Access Type",
      type: "string",
      initialValue: "paid",
      options: {
        layout: "radio",
        list: [
          { title: "Paid", value: "paid" },
          { title: "Free", value: "free" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Use Nigerian naira. Leave empty for free products.",
      hidden: ({ parent }) => parent?.accessType === "free",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description:
        "A compact summary for product cards and the top of the product page. Put longer sales copy in Sales Page Content.",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Sales Page Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "fileFolderId",
      title: "R2 File Folder ID",
      type: "string",
      description:
        "Optional. Files upload under SGC-DOCS/{folder}. Defaults to this product document ID.",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      accessType: "accessType",
      media: "coverImage",
      price: "price",
      title: "title",
    },
    prepare({ accessType, media, price, title }) {
      return {
        media,
        subtitle: accessType === "free" ? "Free product" : `Paid product - NGN ${price ?? 0}`,
        title,
      };
    },
  },
});
