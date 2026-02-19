import React from "react";

const SkeletonBlock = ({ className }: { className: string }) => (
  <div className={`bg-gray-200 rounded-md animate-pulse ${className}`} />
);

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 px-4 sm:px-0">
          <SkeletonBlock className="h-10 w-64 mb-4" />
          <SkeletonBlock className="h-4 w-48" />
        </div>

        {/* Guides Section */}
        <section className="mb-12 px-4 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <SkeletonBlock className="h-6 w-72" />
            <SkeletonBlock className="h-4 w-20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <SkeletonBlock className="aspect-square w-full" />
                <div className="p-4 sm:p-5 space-y-3">
                  <SkeletonBlock className="h-5 w-3/4" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-5/6" />
                  <SkeletonBlock className="h-9 w-28" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className="mb-12 px-4 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <SkeletonBlock className="h-6 w-56" />
            <SkeletonBlock className="h-4 w-20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <SkeletonBlock className="aspect-video w-full" />
                <div className="p-4 sm:p-5 space-y-3">
                  <SkeletonBlock className="h-4 w-32" />
                  <SkeletonBlock className="h-5 w-5/6" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-4/5" />
                  <SkeletonBlock className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="px-4 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <SkeletonBlock className="h-6 w-56" />
            <SkeletonBlock className="h-4 w-20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <SkeletonBlock className="aspect-square w-full" />
                <div className="p-4 sm:p-5 space-y-3">
                  <SkeletonBlock className="h-5 w-3/4" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-5/6" />
                  <div className="flex items-center justify-between">
                    <SkeletonBlock className="h-6 w-20" />
                    <SkeletonBlock className="h-9 w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
