"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  File,
  Loader2,
  Search,
  Trash2,
  Upload,
  X,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductFile = { name: string; path: string };

export type AdminProductOption = {
  fileFolderId?: string;
  files?: ProductFile[];
  id: string;
  slug: string;
  title: string;
};

interface ProductUploadClientProps {
  products: AdminProductOption[];
}

type UploadState = {
  error?: string;
  files?: ProductFile[];
  message?: string;
};

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function mergeFiles(existingFiles: ProductFile[], uploadedFiles: ProductFile[]) {
  const filesByPath = new Map<string, ProductFile>();

  for (const file of [...existingFiles, ...uploadedFiles]) {
    filesByPath.set(file.path, file);
  }

  return Array.from(filesByPath.values()).sort((left, right) =>
    left.name.localeCompare(right.name)
  );
}

export default function ProductUploadClient({
  products,
}: ProductUploadClientProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [productOptions, setProductOptions] =
    useState<AdminProductOption[]>(products);
  const [selectedProductId, setSelectedProductId] = useState(
    products[0]?.id ?? ""
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({});
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);

  const selectedProduct = useMemo(
    () => productOptions.find((product) => product.id === selectedProductId),
    [productOptions, selectedProductId]
  );
  const selectedFolderId = selectedProduct?.fileFolderId || selectedProduct?.id;
  const selectedProductFiles = selectedProduct?.files ?? [];
  const filteredProducts = useMemo(() => {
    const query = productSearch.trim().toLowerCase();

    if (!query) {
      return productOptions;
    }

    return productOptions.filter((product) => {
      const folderId = product.fileFolderId || product.id;

      return [product.title, product.slug, folderId]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [productOptions, productSearch]);

  const setFilesFromList = (files: FileList | File[]) => {
    const incomingFiles = Array.from(files);

    setSelectedFiles((currentFiles) => {
      const filesByKey = new Map<string, File>();

      for (const file of [...currentFiles, ...incomingFiles]) {
        filesByKey.set(`${file.name}-${file.size}-${file.lastModified}`, file);
      }

      return Array.from(filesByKey.values());
    });
    setUploadState({});
  };

  const updateSelectedProductFiles = (files: ProductFile[]) => {
    setProductOptions((currentProducts) =>
      currentProducts.map((product) =>
        product.id === selectedProductId ? { ...product, files } : product
      )
    );
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFolderId) {
      setUploadState({ error: "Choose a product before uploading files." });
      return;
    }

    if (!selectedFiles.length) {
      setUploadState({ error: "Choose at least one file to upload." });
      return;
    }

    const formData = new FormData();
    formData.append("docId", selectedFolderId);

    for (const file of selectedFiles) {
      formData.append("files", file);
    }

    setIsUploading(true);
    setUploadState({});

    try {
      const response = await fetch("/api/admin/products/upload", {
        body: formData,
        method: "POST",
      });
      const payload = (await response.json()) as UploadState;

      if (!response.ok) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      const uploadedFiles = payload.files ?? [];
      updateSelectedProductFiles(
        mergeFiles(selectedProductFiles, uploadedFiles)
      );
      setUploadState(payload);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.refresh();
    } catch (error) {
      setUploadState({
        error: error instanceof Error ? error.message : "Upload failed.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (file: ProductFile) => {
    if (!selectedFolderId) {
      return;
    }

    const confirmed = window.confirm(`Delete ${file.name}?`);

    if (!confirmed) {
      return;
    }

    setDeletingPath(file.path);
    setUploadState({});

    try {
      const response = await fetch("/api/admin/products/files", {
        body: JSON.stringify({
          docId: selectedFolderId,
          path: file.path,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      const payload = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Delete failed.");
      }

      updateSelectedProductFiles(
        selectedProductFiles.filter((item) => item.path !== file.path)
      );
      setUploadState({ message: payload.message ?? "File deleted." });
      router.refresh();
    } catch (error) {
      setUploadState({
        error: error instanceof Error ? error.message : "Delete failed.",
      });
    } finally {
      setDeletingPath(null);
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <form
        onSubmit={handleUpload}
        className="rounded-xl border border-[#eadde1] bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Upload Deliverables</h2>
            <p className="mt-1 text-sm leading-6 text-[#725d66]">
              Pick the product, drop in one or more files, then upload them into its private R2 folder.
            </p>
          </div>
          <span className="w-fit rounded-full bg-[#fff2f5] px-3 py-1 text-xs font-medium text-[#9c6072]">
            25MB per file
          </span>
        </div>

        <div className="mt-6 grid gap-3">
          <label className="text-sm font-medium text-[#35252d]">
            Product
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsPickerOpen((isOpen) => !isOpen)}
              className="flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border border-[#e5d2d8] bg-[#fffdfc] px-4 text-left shadow-xs outline-none transition hover:border-[#c996a6] focus:border-[#b15b73] focus:ring-3 focus:ring-[#f1d6df]"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-[#35252d]">
                  {selectedProduct?.title ?? "Choose a product"}
                </span>
                <span className="mt-0.5 block truncate font-mono text-xs text-[#806873]">
                  {selectedFolderId
                    ? `SGC-DOCS/${selectedFolderId}/`
                    : "No product selected"}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[#9c6072] transition",
                  isPickerOpen ? "rotate-180" : ""
                )}
              />
            </button>

            {isPickerOpen ? (
              <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#eadde1] bg-white shadow-xl">
                <div className="flex items-center gap-2 border-b border-[#f0e5e8] px-3 py-2">
                  <Search className="h-4 w-4 text-[#9c6072]" />
                  <input
                    autoFocus
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="Search products..."
                    className="h-9 w-full bg-transparent text-sm text-[#35252d] outline-none placeholder:text-[#a98f98]"
                  />
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                  {filteredProducts.map((product) => {
                    const folderId = product.fileFolderId || product.id;
                    const isSelected = product.id === selectedProductId;

                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setProductSearch("");
                          setSelectedFiles([]);
                          setUploadState({});
                          setIsPickerOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-[#fff7f4]",
                          isSelected ? "bg-[#fff2f5]" : ""
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-[#35252d]">
                            {product.title}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-xs text-[#806873]">
                            {folderId}
                          </span>
                        </span>
                        <span className="shrink-0 rounded-full bg-[#fbf7f5] px-2 py-1 text-xs text-[#806873]">
                          {product.files?.length ?? 0} file
                          {product.files?.length === 1 ? "" : "s"}
                        </span>
                      </button>
                    );
                  })}

                  {!filteredProducts.length ? (
                    <p className="px-3 py-6 text-center text-sm text-[#806873]">
                      No products found.
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <label className="text-sm font-medium text-[#35252d]" htmlFor="files">
            Product Files
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              setFilesFromList(event.dataTransfer.files);
            }}
            className={cn(
              "flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-8 text-center transition",
              isDragging
                ? "border-[#b15b73] bg-[#fff2f5]"
                : "border-[#e3cbd3] bg-[#fffdfc] hover:border-[#c996a6] hover:bg-[#fff9f7]"
            )}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8e5eb] text-[#9c6072]">
              <Upload className="h-6 w-6" />
            </span>
            <span className="mt-4 text-base font-semibold text-[#35252d]">
              Drop files here or click to browse
            </span>
            <span className="mt-2 max-w-md text-sm leading-6 text-[#806873]">
              PDFs, videos, images, checklists, and companion files are supported.
            </span>
          </button>
          <input
            ref={fileInputRef}
            id="files"
            name="files"
            type="file"
            multiple
            className="sr-only"
            onChange={(event) => {
              setFilesFromList(event.target.files ?? []);
            }}
          />

          {selectedFiles.length ? (
            <div className="rounded-xl border border-[#f0e5e8] bg-[#fffaf8] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[#35252d]">
                  {selectedFiles.length} file
                  {selectedFiles.length === 1 ? "" : "s"} ready to upload
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFiles([]);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="text-xs font-medium text-[#9c6072] hover:text-[#6f3949]"
                >
                  Clear
                </button>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-[#806873]">
                {selectedFiles.map((file) => (
                  <li
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"
                  >
                    <span className="min-w-0 truncate">{file.name}</span>
                    <span className="shrink-0">{formatFileSize(file.size)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={isUploading || !selectedFolderId || !selectedFiles.length}
          className="mt-6 h-11 bg-[#3d2630] text-white hover:bg-[#5c3948]"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload {selectedFiles.length > 1 ? `${selectedFiles.length} Files` : "Files"}
            </>
          )}
        </Button>

        {uploadState.message ? (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <div className="flex items-center gap-2 font-medium">
              <Check className="h-4 w-4" />
              {uploadState.message}
            </div>
            {uploadState.files?.length ? (
              <ul className="mt-3 space-y-1 font-mono text-xs">
                {uploadState.files.map((file) => (
                  <li key={file.path}>{file.path}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {uploadState.error ? (
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
            <XCircle className="mt-0.5 h-4 w-4" />
            <span>{uploadState.error}</span>
          </div>
        ) : null}
      </form>

      <aside className="rounded-xl border border-[#eadde1] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Attached Files</h2>
            <p className="mt-1 text-sm leading-6 text-[#725d66]">
              Review and delete files for the selected product.
            </p>
          </div>
          <span className="rounded-full bg-[#fbf7f5] px-3 py-1 text-xs font-medium text-[#806873]">
            {selectedProductFiles.length} file
            {selectedProductFiles.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-5 rounded-xl border border-[#f0e5e8] bg-[#fffaf8] p-4">
          <p className="truncate text-sm font-semibold text-[#35252d]">
            {selectedProduct?.title ?? "No product selected"}
          </p>
          <p className="mt-1 truncate font-mono text-xs text-[#806873]">
            {selectedFolderId ? `SGC-DOCS/${selectedFolderId}/` : "No folder"}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {selectedProductFiles.map((file) => (
            <div
              key={file.path}
              className="flex items-center gap-3 rounded-xl border border-[#f0e5e8] bg-white px-3 py-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8e5eb] text-[#9c6072]">
                <File className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#35252d]">
                  {file.name}
                </p>
                <p className="mt-0.5 truncate font-mono text-xs text-[#9b818a]">
                  {file.path}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleDeleteFile(file)}
                disabled={Boolean(deletingPath)}
                aria-label={`Delete ${file.name}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingPath === file.path ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}

          {!selectedProductFiles.length ? (
            <div className="rounded-xl border border-dashed border-[#e3cbd3] bg-[#fffdfc] px-4 py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8e5eb] text-[#9c6072]">
                <X className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-medium text-[#35252d]">
                No files attached yet
              </p>
              <p className="mt-1 text-sm leading-6 text-[#806873]">
                Upload files for this product and they will appear here.
              </p>
            </div>
          ) : null}
        </div>
      </aside>
    </section>
  );
}
