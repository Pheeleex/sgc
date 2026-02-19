
export default {
  name: 'productRoundup',
  title: 'Product Roundup Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'Catchy, benefit-driven headline (SEO friendly).'
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short summary with keywords and hook (for SEO).'
    },
    {
      name: 'introHook',
      title: 'Opening Hook',
      type: 'text',
      description: 'Relatable intro that sets the scene for the reader.'
    },
    {
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Explain why the product category is important (include must-have features).'
    },
    {
      name: 'productList',
      title: 'Spotlight Picks',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Product Item',
          fields: [
            { name: 'nickname', title: 'Catchy Name', type: 'string', description: 'e.g. The Smart Organizer' },
            { name: 'link', title: 'Product Link', type: 'url' },
            { name: 'image', title: 'Product Image', type: 'image' },
            { name: 'description', title: 'Quick Description', type: 'text' },
            {
              name: 'highlights',
              title: 'Standout Features',
              type: 'array',
              of: [{ type: 'string' }]
            },
            { name: 'audience', title: 'Perfect For', type: 'string', description: 'Who would love this product most?' }
          ]
        }
      ]
    },
    {
      name: 'careTips',
      title: 'Care & Maintenance Guide',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Tips to extend lifespan or get the best use out of the products.'
    },
    {
      name: 'valuePerspective',
      title: 'Smart Shopping Insights',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Explain value, cost-per-use, and practical buying advice.'
    },
    {
      name: 'personalRecommendation',
      title: 'Personal Recommendation',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Closing section with your personal touch (encourage picking a match).'
    },
    {
      name: 'callToAction',
      title: 'Call to Action',
      type: 'string',
      description: 'Engaging prompt (e.g. “Which one is your favorite? Drop a comment below!”).'
    },
    {
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'text',
      description: 'Affiliate/sponsorship disclosure.'
    }
  ]
}
