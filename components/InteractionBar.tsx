'use client';

import { Bookmark, Heart, MessageCircle, Share2, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const InteractionBar = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const pathname = usePathname();
  const fullUrl = typeof window !== "undefined" ? window.location.origin + pathname : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    alert("Link copied to clipboard!");
    setShareOpen(false);
  };

  return (
    <div className="px-8 py-4 border-t border-gray-100 bg-white flex flex-wrap justify-between items-center relative z-10">
      {/* Left Actions */}
      <div className="flex space-x-6">
        <button
          className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition`}
          onClick={() => setLiked(!liked)}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
        </button>

        <a href="#comment-box" className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition">
          <MessageCircle size={18} />
          <span className="text-sm">Comment</span>
        </a>

        <div className="relative">
          <button
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition"
            onClick={() => setShareOpen(!shareOpen)}
          >
            <Share2 size={18} />
            <span className="text-sm">Share</span>
          </button>

          {shareOpen && (
            <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg border w-64 z-50 p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-700">Share this post</p>
                <button onClick={() => setShareOpen(false)}><X size={16} /></button>
              </div>
              <div className="space-y-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-600 hover:text-green-600 transition"
                >
                  Share on WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-600 hover:text-blue-500 transition"
                >
                  Share on Twitter
                </a>
                <a
                  href={`https://www.instagram.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-600 hover:text-pink-500 transition"
                >
                  Share on Instagram
                </a>
                <button
                  onClick={handleCopy}
                  className="block w-full text-left text-sm text-gray-600 hover:text-indigo-600 transition"
                >
                  Copy link to clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Save */}
      <button
        className={`flex items-center space-x-1 ${saved ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 transition`}
        onClick={() => setSaved(!saved)}
      >
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        <span className="text-sm">{saved ? 'Saved' : 'Save'}</span>
      </button>
    </div>
  );
};
