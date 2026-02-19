import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  groups: [
    { name: 'details', title: 'Details' },
    { name: 'editorial', title: 'Editorial' },
  ],

  fields: [
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Softness', value: 'softness' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      group: 'details',
    }),

    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'details',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) =>
        rule.required().error('Slug is required to publish.'),
      group: 'details',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'details',
    }),

    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Published Date',
      group: 'details',
    }),

    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      group: 'editorial',
    }),

    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      group: 'editorial',
    }),

    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        },
      ],
      group: 'editorial',
      hidden: ({ parent }) => parent?.postType === 'softness',
    }),

    // 💡 Softness-specific fields
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'markdown',
      group: 'editorial',
      hidden: ({ parent }) => parent?.postType !== 'softness',
    }),

    defineField({
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'string',
      group: 'editorial',
      hidden: ({ parent }) => parent?.postType !== 'softness',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'editorial',
      hidden: ({ parent }) => parent?.postType !== 'softness',
    }),

    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Section',
          fields: [
            { name: 'heading', type: 'string', title: 'Section Heading' },
            { name: 'body', type: 'markdown', title: 'Section Body' },
            {
              name: 'image',
              type: 'image',
              title: 'Section Image',
              options: { hotspot: true },
            },
          ],
        },
      ],
      group: 'editorial',
      hidden: ({ parent }) => parent?.postType !== 'softness',
    }),

    defineField({
      name: 'outro',
      title: 'Outro',
      type: 'markdown',
      group: 'editorial',
      hidden: ({ parent }) => parent?.postType !== 'softness',
    }),

    defineField({
      name: 'productHeader',
      title: 'Product Header',
      type: 'markdown',
    }),

    defineField({
      name: 'recommendedProducts',
      title: 'Recommended Products',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Product Section',
          fields: [
            { name: 'sectionTitle', type: 'string', title: 'Section Title' },
            {
              name: 'products',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Product',
                  fields: [
                    { name: 'name', type: 'string', title: 'Product Name' },
                    { name: 'url', type: 'url', title: 'Product URL' },
                    { name: 'description', type: 'string', title: 'Description' },
                    {
                      name: 'image',
                      type: 'image',
                      title: 'Product Image',
                      options: { hotspot: true },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      group: 'editorial',
      hidden: ({ parent }) => parent?.postType !== 'softness',
    }),
  ],
});