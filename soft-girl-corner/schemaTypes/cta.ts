import { defineType } from "sanity";

export const ctaType = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'CTA Text',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link URL',
      type: 'url',
    },
    {
      name: 'style',
      title: 'Style (optional)',
      type: 'string',
      options: {
        list: ['button', 'highlight', 'plain'],
      },
    },
  ],
});
