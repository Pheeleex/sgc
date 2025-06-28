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
            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 48 48"
              className="w-8 h-8 sm:w-10 sm:h-10"
            >
              <linearGradient
                id="IfhrvZkWi8LOXjspG~Pupa_XErM9A1xNUK5_gr1"
                x1="14.899"
                x2="33.481"
                y1="43.815"
                y2="7.661"
                gradientTransform="matrix(1 0 0 -1 .108 50.317)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#f22543"></stop>
                <stop offset=".422" stopColor="#eb2239"></stop>
                <stop offset="1" stopColor="#e52030"></stop>
              </linearGradient>
              <path
                fill="url(#IfhrvZkWi8LOXjspG~Pupa_XErM9A1xNUK5_gr1)"
                d="M44,23.981C44.011,35.026,35.064,43.989,24.019,44S4.011,35.064,4,24.019C3.989,12.974,12.936,4.011,23.981,4	C35.026,3.989,43.989,12.936,44,23.981z"
              ></path>
              {/* Truncated for brevity */}
            </svg>
            <span className="text-sm sm:text-base">Check us out on Pinterest</span>
          </a>
        </div>
        {/* You can add more content like an image gallery or social feed here */}
      </div>
    </section>
  );
};

export default SocialMedia;
