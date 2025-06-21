import { Heart } from 'lucide-react'
import React from 'react'

const SocialMedia = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-serif font-semibold">Follow Our Journey</h2>
          <a href="#" className="flex items-center text-rose-600 hover:text-rose-700 font-medium">
            Pinterest
            @SoftgirlCircle
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="aspect-square overflow-hidden rounded-md relative group">
            <img 
              src="/Images/level.jpg" 
              alt="Pinterest post" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Heart size={24} className="text-white" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SocialMedia
