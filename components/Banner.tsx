import React from 'react'
import { Button } from './ui/button'

const Banner = () => {
  return (
    <section className="py-24 bg-cover bg-center text-white" style={{ backgroundImage: `url('/Images/pinteresty5.jpg')` }}>
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Your Soft Girl Starter Kit</h2>
          <p className="text-lg mb-8 text-red-100">
            Skincare faves, haircare rituals, wellness habits, and little luxuries that bring softness and beauty into your every day.
          </p>
          <Button className="bg-white text-rose-600 hover:bg-neutral-100 px-6 py-2 rounded-md transition-colors">
            Read the Guide
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Banner
