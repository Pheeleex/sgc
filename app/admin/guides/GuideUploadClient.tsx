"use client";

import { useMemo, useState } from "react";
import { Check, Loader2, Upload, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type AdminGuideOption = {
  files?: { name: string; path: string }[];
  id: string;
  slug: string;
  title: string;
};

interface GuideUploadClientProps {
  guides: AdminGuideOption[];
}

type UploadState = {
  error?: string;
  files?: { name: string; path: string }[];
  message?: string;
};

export default function GuideUploadClient({ guides }: GuideUploadClientProps) {
  const [selectedGuideId, setSelectedGuideId] = useState(guides[0]?.id ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({});

  const selectedGuide = useMemo(
    () => guides.find((guide) => guide.id === selectedGuideId),
    [guides, selectedGuideId]
  );

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsUploading(true);
    setUploadState({});

    try {
      const response = await fetch("/api/admin/guides/upload", {
        body: formData,
        method: "POST",
      });
      const payload = (await response.json()) as UploadState;

      if (!response.ok) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      setUploadState(payload);
      form.reset();
      setSelectedGuideId(formData.get("docId")?.toString() ?? "");
    } catch (error) {
      setUploadState({
        error: error instanceof Error ? error.message : "Upload failed.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-[#35252d]" htmlFor="docId">
          Guide
        </label>
        <select
          id="docId"
          name="docId"
          value={selectedGuideId}
          onChange={(event) => setSelectedGuideId(event.target.value)}
          className="h-11 w-full rounded-md border border-[#e5d2d8] bg-white px-3 text-sm text-[#35252d] shadow-xs outline-none transition focus:border-[#b15b73] focus:ring-3 focus:ring-[#f1d6df]"
          required
        >
          {guides.map((guide) => (
            <option key={guide.id ?? guide.slug} value={guide.id ?? ""}>
              {guide.title} {guide.id ? `(${guide.id})` : "(missing id)"}
            </option>
          ))}
        </select>
        {selectedGuide ? (
          <p className="text-xs text-[#806873]">
            Files will upload under{" "}
            <span className="font-mono">SGC-DOCS/{selectedGuide.id}/</span>
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-[#35252d]" htmlFor="files">
          Files
        </label>
        <Input
          id="files"
          name="files"
          type="file"
          multiple
          required
          className="h-auto py-2"
        />
        <p className="text-xs text-[#806873]">
          PDFs, checklists, and companion files are supported. Keep each file under 25MB for this uploader.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isUploading || !selectedGuideId}
        className="bg-[#3d2630] text-white hover:bg-[#5c3948]"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Upload Files
          </>
        )}
      </Button>

      {uploadState.message ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
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
        <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          <XCircle className="mt-0.5 h-4 w-4" />
          <span>{uploadState.error}</span>
        </div>
      ) : null}
    </form>
  );
}
