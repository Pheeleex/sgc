import {
  ComposeIcon,
  DocumentTextIcon,
  PackageIcon,
  SparklesIcon,
} from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";

import { defaultDocumentNode } from "./soft-girl-corner/Structure/defaultDocumentNode";
import { structure } from "./soft-girl-corner/Structure";
import { schemaTypes } from "./soft-girl-corner/schemaTypes";

const now = () => new Date().toISOString();

export default defineConfig({
  name: "default",
  title: "Soft girl corner",
  projectId: "6hxewtft",
  dataset: "production",
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    visionTool(),
    markdownSchema(),
  ],
  schema: {
    types: schemaTypes,
    templates: (previous) => [
      ...previous.filter(
        (template) =>
          !["post", "softnessTypePage", "productRoundup"].includes(
            template.schemaType
          )
      ),
      {
        id: "post-standard-article",
        title: "Standard Article",
        icon: DocumentTextIcon,
        schemaType: "post",
        value: {
          postType: "default",
          layoutStyle: "classic",
          date: now(),
        },
      },
      {
        id: "post-feature-story",
        title: "Feature Story",
        icon: SparklesIcon,
        schemaType: "post",
        value: {
          postType: "feature",
          layoutStyle: "editorial",
          date: now(),
        },
      },
      {
        id: "post-guide",
        title: "Guide",
        icon: ComposeIcon,
        schemaType: "post",
        value: {
          postType: "guide",
          layoutStyle: "spotlight",
          date: now(),
        },
      },
      {
        id: "post-product-roundup",
        title: "Product Roundup",
        icon: PackageIcon,
        schemaType: "post",
        value: {
          postType: "roundup",
          layoutStyle: "editorial",
          showAffiliateDisclosure: true,
          date: now(),
        },
      },
    ],
  },
});
