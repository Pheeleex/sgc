'use client';
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";


export const InteractionBar = () => {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false)
    return(
        <div className="px-8 py-4 border-t border-gray-100 flex justify-between items-center">
<div className="flex space-x-6">
  <button
    className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition`}
    onClick={() => setLiked(!liked)}
  >
    <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
    <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
  </button>

  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition">
    <MessageCircle size={18} />
    <span className="text-sm">Comment</span>
  </button>

  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition">
    <Share2 size={18} />
    <span className="text-sm">Share</span>
  </button>
</div>

<button
  className={`flex items-center space-x-1 ${saved ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500 transition`}
  onClick={() => setSaved(!saved)}
>
  <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
  <span className="text-sm">{saved ? 'Saved' : 'Save'}</span>
</button>
</div>
    )
}
