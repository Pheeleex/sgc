import { urlFor } from "@/app/(root)/blog/image";

type RecommendedProductsProps = {
  productHeader?: string; // Add this new prop
  recommendedProducts?: {
    sectionTitle: string;
    products: {
      name: string;
      url: string;
      description?: string;
      image?: any;
    }[];
  }[];
};

export default function RecommendedProducts({ productHeader, recommendedProducts }: RecommendedProductsProps) {
  if (!recommendedProducts?.length) return null;

  return (
    <section className="mt-16 space-y-12">
      {/* Product Header Section - beautifully styled */}
      {productHeader && (
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-gray-100 via-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200/50 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                {productHeader}
              </p>
              <div className="flex justify-center mt-4">
                <div className="w-12 h-1 bg-gradient-to-r from-gray-400 to-slate-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
       
      {recommendedProducts.map((section, i) => (
        <div key={i} className="bg-slate-50/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-200/50">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-8 text-center">
            {section.sectionTitle}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.products.map((product, idx) => (
              <li
                key={idx}
                className="group flex gap-4 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:border-gray-200"
              >
                {product.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={urlFor(product.image).width(120).height(120).url()}
                      alt={product.name}
                      className="w-28 h-28 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h4 className="text-lg font-bold text-gray-700 hover:text-gray-800 transition-colors duration-200 group-hover:underline decoration-gray-300 line-clamp-2">
                      {product.name}
                    </h4>
                  </a>
                  {product.description && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  )}
                  <div className="mt-3">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full hover:bg-slate-200 transition-colors duration-200"
                    >
                      View Product →
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
