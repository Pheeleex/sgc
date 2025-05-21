// components/SearchBar.tsx (Mobile-optimized)
"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { featuredPosts } from "@/lib/data/blog";

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = featuredPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
          <input
            type="text"
            placeholder="Search articles..."
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-4 text-lg bg-transparent outline-none placeholder:text-neutral-400"
          />
          <button
            onClick={() => {
              onClose();
              setSearchQuery("");
            }}
            className="p-2 rounded-full active:bg-neutral-100"
          >
            <X className="w-6 h-6 text-neutral-500" />
          </button>
        </div>

        {searchQuery && (
          <div className="flex-1 overflow-y-auto">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block py-4 px-2 border-b border-neutral-100 active:bg-neutral-50"
                  onClick={() => {
                    onClose();
                    setSearchQuery("");
                  }}
                >
                  <span className="text-neutral-700">{post.title}</span>
                </Link>
              ))
            ) : (
              <div className="py-4 px-2 text-neutral-500">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;