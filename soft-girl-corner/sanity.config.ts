import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { structure, } from './Structure'
import { defaultDocumentNode } from './Structure/defaultDocumentNode'
import { markdownSchema } from "sanity-plugin-markdown";

export default defineConfig({
  name: 'default',
  title: 'Soft girl corner',

  projectId: '6hxewtft',
  dataset: 'production',

  plugins: [
    structureTool({structure}), 
    visionTool(),
    markdownSchema()
  ],

  schema: {
    types: schemaTypes,
  },
})
