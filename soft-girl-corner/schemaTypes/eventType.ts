import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import { DoorsOpenInput } from './components/DoorsOpenInput'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
  {name: 'details', title: 'Details'},
  {name: 'editorial', title: 'Editorial'},
],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
        group: ['details', 'editorial']
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule
    .required()
    .error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      group: 'details',
      options: {
    list: ['in-person', 'virtual'],
    layout: 'radio',
  },
    }),    
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
        group: 'details',
    }),
    defineField({
      name: 'doorsOpen',
      title: 'Doors Open (Time)',
      type: 'number',
        description: 'Number of minutes before the start time for admission',
      initialValue: 60,
      group: ['details', 'editorial'],
       components: {
    input: DoorsOpenInput
  }
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{type: 'venue'}],
       group: ['details', 'editorial'],
       validation: (rule) =>
    rule.custom((value, context) => {
      if (value && context?.document?.eventType === 'virtual') {
        return 'Only in-person events can have a venue'
      }

      return true
    }),
    }),
    defineField({
      name: 'headline',
      title: 'Headline Artist',
      type: 'reference',
      to: [{type: 'artist'}],
       group: ['details', 'editorial']
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      group: 'details'
    }),
    defineField({
      name: 'details',
      title: 'Event Details',
      type: 'array',
      of: [{type: 'block'}],
      group: 'details'
    }),
    defineField({
      name: 'tickets',
      title: 'Tickets URL',
      type: 'url',
       group: ['details', 'editorial']
    }),
  ],

  // Update the preview key in the schema
preview: {
  select: {
    name: 'name',
    venue: 'venue.name',
    artist: 'headline.name',
    date: 'date',
    image: 'image',
  },
  prepare({name, venue, artist, date, image}) {
    const nameFormatted = name || 'Untitled event'
    const dateFormatted = date
      ? new Date(date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      : 'No date'

    return {
      title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
      subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
      media: image || CalendarIcon,
    }
  },
},
})
