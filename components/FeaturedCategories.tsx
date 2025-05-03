import { ChevronRight } from 'lucide-react'
import React from 'react'

const FeaturedCategories = () => {
    
  const categories = [
    { name: 'Fashion', imageUrl: 'Images/Pinteresty5.jpg', description: 'Seasonal trends and timeless classics' },
    { name: 'Hair Care', imageUrl: '/Images/Pinteresty1.jpg', description: 'Natural solutions for radiant hair' },
    { name: 'Skin Care', imageUrl: '/Images/Pinteresty4.jpg', description: 'Routines for healthy, glowing skin' },
    { name: 'Wellness', imageUrl: '/Images/Pinteresty6.jpg', description: 'Holistic approaches to self-care' }
  ];

  return (
    <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-serif font-semibold text-center mb-12">Explore Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
            <div className="aspect-w-3 aspect-h-2">
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-white/80 mb-4">{category.description}</p>
              <div className="flex items-center text-sm font-medium text-white group-hover:text-rose-300 transition-colors">
                <span>View Articles</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default FeaturedCategories
