import Link from "next/link";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";

const MobileMenu = ({ toggleSearch }: { toggleSearch: () => void }) => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="md:hidden bg-white border-t border-neutral-100 py-4">
      <div className="container mx-auto px-4 flex flex-col space-y-4">
        <Link
          href="/"
          className="text-neutral-700 hover:text-rose-600 transition-colors py-2"
        >
          Home
        </Link>
        <a
          href="/#RecommendedProducts"
          className="text-neutral-700 hover:text-rose-600 transition-colors py-2"
        >
          Recommended Products
        </a>
        <a
          href="/#Posts"
          className="text-neutral-700 hover:text-rose-600 transition-colors py-2"
        >
          Recent Posts
        </a>
        <Link
          href="/About"
          className="text-neutral-700 hover:text-rose-600 transition-colors py-2"
        >
          About
        </Link>

        <div>
          <button
            onClick={() => setShowCategories((prev) => !prev)}
            className="w-full flex justify-between items-center text-neutral-700 hover:text-rose-600 transition-colors py-2"
          >
            <span className="font-semibold">Categories</span>
            {showCategories ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showCategories && (
            <div className="flex flex-col space-y-2 pl-4 mt-2">
              <Link href="/Categories/fashion" className="hover:text-rose-600 transition-colors">
                Fashion
              </Link>
              <Link href="/Categories/hair" className="hover:text-rose-600 transition-colors">
                Hair
              </Link>
              <Link href="/Categories/skin" className="hover:text-rose-600 transition-colors">
                Skin
              </Link>
              <Link href="/Categories/wellness" className="hover:text-rose-600 transition-colors">
                Wellness
              </Link>
            </div>
          )}
        </div>

        <div className="flex space-x-6 py-2">
          <button
            onClick={toggleSearch}
            className="text-neutral-700 hover:text-rose-600 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
