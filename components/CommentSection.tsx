'use client';

import { useState } from 'react';

export const CommentBox = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setComments(prev => [...prev, comment]);
    setComment('');
  };

  return (
    <div id="comment-box" className="mt-6 px-5 sm:px-8 py-6 bg-gray-50 border-t border-gray-200 rounded-b-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave a Comment</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Post Comment
        </button>
      </form>

      {/* Render posted comments */}
      {comments.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-md font-medium text-gray-700">Comments</h4>
          {comments.map((c, idx) => (
            <div key={idx} className="p-3 border border-gray-200 rounded-md bg-white shadow-sm">
              <p className="text-sm text-gray-800">{c}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
