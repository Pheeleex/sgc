import { defineField, defineType } from 'sanity';

export const softnessTypePage = defineType({
  name: 'softnessTypePage',
  title: 'Softness Type Page',
  type: 'document',

  groups: [
    { name: 'details', title: 'Details' },
    { name: 'editorial', title: 'Editorial' },
  ],

  fields: [
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
      name: 'intro',
      title: 'Intro Text',
      type: 'markdown',
      group: 'editorial',
    }),
    defineField({
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'editorial',
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
            {
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
            },
            {
              name: 'body',
              title: 'Section Body',
              type: 'markdown',
            },
            {
              name: 'image',
              title: 'Section Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
      group: 'editorial',
    }),
    defineField({
      name: 'outro',
      title: 'Outro',
      type: 'markdown',
      group: 'editorial',
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
            {
              name: 'sectionTitle',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'products',
              title: 'Products',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Product',
                  fields: [
                    { name: 'name', title: 'Product Name', type: 'string' },
                    { name: 'url', title: 'Product URL', type: 'url' },
                    { name: 'description', title: 'Description', type: 'string' },
                    {
                      name: 'image',
                      title: 'Product Image',
                      type: 'image',
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
    }),
  ],
});
