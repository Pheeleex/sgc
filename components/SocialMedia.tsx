import { Heart } from "lucide-react";
import React from "react";

const SocialMedia = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold">
            Follow Our Journey
          </h2>
          <a
            href="https://pin.it/2MpnYXYET"
            className="flex items-center text-rose-600 hover:text-rose-700 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-10 h-10"
            >
              <defs>
                <linearGradient
                  id="pinterestGradient"
                  x1="14.899"
                  x2="33.481"
                  y1="43.815"
                  y2="7.661"
                  gradientTransform="matrix(1 0 0 -1 .108 50.317)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#f22543" />
                  <stop offset=".422" stopColor="#eb2239" />
                  <stop offset="1" stopColor="#e52030" />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="20" fill="url(#pinterestGradient)" />
              <path
                fill="#FFF"
                d="M24.4 11.4c-8.6 0-13.2 5.8-13.2 12.1 0 2.9 1.6 6.6 4.1 7.7.4.2.6.1.7-.3l.6-2.3c.1-.2 0-.4-.1-.6-.8-1-1.5-2.8-1.5-4.6 0-4.4 3.3-8.7 9-8.7 4.9 0 8.4 3.3 8.4 8.1 0 5.4-2.7 9.2-6.3 9.2-2 0-3.4-1.6-3-3.6.6-2.4 1.7-4.9 1.7-6.7 0-1.5-.8-2.8-2.5-2.8-2 0-3.6 2.1-3.6 4.9 0 1.8.6 3 .6 3s-2 8.4-2.4 9.9c-.4 1.7-.3 4 .1 5.7.8.3 1.6.6 2.4.8.8-1.2 2-3.4 2.5-5.2.2-.6.7-2.6 1-3.8 1 1 2.7 1.7 4.4 1.7 5.5 0 9.9-4.9 9.9-11.9 0-6.9-5.5-12.1-12.8-12.1z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
