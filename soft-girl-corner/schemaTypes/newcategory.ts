// schemas/blog.js
export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      //validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
     // validation: Rule => Rule.required(),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      //validation: Rule => Rule.required().min(40).max(160),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'mainImage',
      title: 'Main Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' }, // Headings, paragraphs, lists
        { type: 'image' },
        { type: 'table' }, // Custom table type (defined below)
      ],
    },
    {
      name: 'additionalImages',
      title: 'Additional Images (up to 3)',
      type: 'array',
      of: [{ type: 'image' }],
      //validation: Rule => Rule.max(3),
    },
    {
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
    },
    {
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'url',
    },
    {
      name: 'affiliateDisclosure',
      title: 'Affiliate Disclosure',
      type: 'text',
    },
  ],
};
