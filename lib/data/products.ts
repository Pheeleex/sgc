import "server-only";

import type { TypedObject } from "@portabletext/types";

import { client } from "@/app/(root)/blog/client";
import {
  getDocumentBySlug as getLegacyDocumentBySlug,
  getDocuments as getLegacyDocuments,
  type Documents as LegacyDocument,
} from "@/lib/firebase/getProducts";
import { listGuideFiles } from "@/lib/storage/r2";

export type ProductAccessType = "free" | "paid";

export interface Product {
  accessType?: ProductAccessType;
  body?: TypedObject[];
  category: string;
  createdAt?: string | null;
  description: string;
  fileFolderId?: string;
  files?: { name: string; path: string }[];
  gallery?: { alt?: string; url: string }[];
  id?: string;
  price?: number;
  slug: string;
  title: string;
  url: string;
}

type SanityProduct = {
  _createdAt?: string;
  _id: string;
  accessType?: ProductAccessType;
  body?: TypedObject[];
  category?: string;
  coverImageUrl?: string;
  fileFolderId?: string;
  gallery?: { alt?: string; url?: string }[];
  price?: number;
  shortDescription?: string;
  slug?: string;
  title?: string;
};

export type Documents = Product;

const PRODUCT_FIELDS = `{
  _createdAt,
  _id,
  accessType,
  "body": body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    }
  },
  category,
  "coverImageUrl": coverImage.asset->url,
  fileFolderId,
  "gallery": gallery[]{
    alt,
    "url": asset->url
  },
  price,
  shortDescription,
  "slug": slug.current,
  title
}`;

const PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current) && published != false] | order(_createdAt desc) ${PRODUCT_FIELDS}`;
const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug && published != false][0] ${PRODUCT_FIELDS}`;

function getProductFileFolder(product: Pick<Product, "fileFolderId" | "id">) {
  return product.fileFolderId || product.id;
}

async function getFilesForProduct(product: Pick<Product, "fileFolderId" | "id">) {
  const folderId = getProductFileFolder(product);

  if (!folderId) {
    return [];
  }

  try {
    return listGuideFiles(folderId);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Missing required environment variable")
    ) {
      throw error;
    }

    console.error(`No product files found for ${folderId}:`, error);
    return [];
  }
}

function normalizeSanityProduct(product: SanityProduct | null): Product | null {
  if (!product) {
    return null;
  }

  if (!product.slug || !product.title || !product.shortDescription) {
    return null;
  }

  const id = product._id.replace(/^drafts\./, "");

  return {
    accessType: product.accessType ?? "paid",
    body: product.body ?? [],
    category: product.category ?? "digital",
    createdAt: product._createdAt ?? null,
    description: product.shortDescription,
    fileFolderId: product.fileFolderId,
    gallery:
      product.gallery
        ?.filter((image): image is { alt?: string; url: string } => Boolean(image.url))
        .map((image) => ({
          alt: image.alt,
          url: image.url,
        })) ?? [],
    id,
    price: product.accessType === "free" ? 0 : product.price,
    slug: product.slug,
    title: product.title,
    url: product.coverImageUrl ?? "",
  };
}

function normalizeLegacyProduct(product: LegacyDocument): Product {
  return {
    accessType: product.price === 0 ? "free" : "paid",
    category: product.category,
    createdAt:
      typeof product.createdAt === "string" || product.createdAt === null
        ? product.createdAt
        : null,
    description: product.description,
    files: product.files ?? [],
    id: product.id,
    price: product.price,
    slug: product.slug,
    title: product.title,
    url: product.url,
  };
}

async function withFiles(product: Product): Promise<Product> {
  return {
    ...product,
    files: await getFilesForProduct(product),
  };
}

export async function getProducts(): Promise<Product[]> {
  const sanityProducts = (await client.fetch<SanityProduct[]>(PRODUCTS_QUERY))
    .map(normalizeSanityProduct)
    .filter((product): product is Product => Boolean(product));

  if (sanityProducts.length) {
    return Promise.all(sanityProducts.map(withFiles));
  }

  const legacyProducts = await getLegacyDocuments();
  return legacyProducts.map(normalizeLegacyProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sanityProduct = normalizeSanityProduct(
    await client.fetch<SanityProduct | null>(PRODUCT_BY_SLUG_QUERY, { slug })
  );

  if (sanityProduct) {
    return withFiles(sanityProduct);
  }

  const legacyProduct = await getLegacyDocumentBySlug(slug);
  return legacyProduct ? normalizeLegacyProduct(legacyProduct) : null;
}
