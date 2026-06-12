import {
  ComposeIcon,
  DocumentsIcon,
  PackageIcon,
  SparklesIcon,
  TagIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const apiVersion = "2024-11-01";

export const structure: StructureResolver = (S) => {
  const postList = (title: string, filter: string, icon = DocumentsIcon) =>
    S.listItem()
      .title(title)
      .icon(icon)
      .child(
        S.documentList()
          .title(title)
          .apiVersion(apiVersion)
          .schemaType("post")
          .filter(filter)
          .defaultOrdering([{ field: "date", direction: "desc" }])
      );

  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Posts")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Posts")
            .items([
              postList("All Posts", '_type == "post"'),
              postList(
                "Standard Articles",
                '_type == "post" && (!defined(postType) || postType == "default")',
                ComposeIcon
              ),
              postList(
                "Feature Stories",
                '_type == "post" && postType == "feature"',
                SparklesIcon
              ),
              postList(
                "Guides",
                '_type == "post" && postType == "guide"',
                SparklesIcon
              ),
              postList(
                "Product Roundups",
                '_type == "post" && postType == "roundup"',
                PackageIcon
              ),
              postList(
                "Legacy Softness Posts",
                '_type == "post" && postType == "softness"',
                SparklesIcon
              ),
              postList(
                "Drafts",
                '_type == "post" && _id in path("drafts.**")'
              ),
            ])
        ),
      S.documentTypeListItem("category").title("Categories").icon(TagIcon),
    ]);
};
