import { defineField, defineType } from "sanity";

export const tableType = defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          title: 'Table Row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),
  ],
});
