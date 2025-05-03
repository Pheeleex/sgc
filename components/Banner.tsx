import React from 'react'
import { Button } from './ui/button'

const Banner = () => {
  return (
    <section className="py-24 bg-cover bg-center text-white" style={{ backgroundImage: `url('/Images/Pinteresty5.jpg')` }}>
    <div className="container mx-auto px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Sustainable Beauty Guide</h2>
        <p className="text-lg mb-8">Discover our curated collection of eco-friendly beauty products and practices for a more sustainable self-care routine.</p>
        <Button className="bg-white text-rose-600 hover:bg-neutral-100 px-6 py-2 rounded-md transition-colors">
          Read the Guide
        </Button>
      </div>
    </div>
  </section>
  )
}

export default Banner
