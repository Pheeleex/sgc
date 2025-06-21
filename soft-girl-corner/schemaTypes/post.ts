import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  // 👉 Add this block for grouping fields
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
      validation: (rule) => rule.required().error('Slug is required to publish.'),
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
      of: [{ type: 'block' }],
      group: 'editorial',
    }),
  ],
})
