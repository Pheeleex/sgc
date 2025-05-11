import React from 'react'
import { Button } from './ui/button'
import { BookOpen, Instagram, Mail, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-serif font-bold text-rose-400 mb-6">Soft girl circle</h3>
          <p className="text-neutral-400 mb-6">Empowering women through beauty, fashion, and wellness insights that celebrate individuality and self-expression.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">
              <BookOpen size={20} />
            </a>
            <a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6">Categories</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Fashion</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Hair Care</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Skin Care</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Wellness</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Lifestyle</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">About Us</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Contact</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="text-neutral-400 hover:text-rose-400 transition-colors">Advertise With Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <div className="flex items-start mb-4">
            <Mail size={20} className="text-rose-400 mr-4 mt-1 flex-shrink-0" />
            <p className="text-neutral-400">hello@ehi.com</p>
          </div>
          <p className="text-neutral-400 mb-6">Subscribe to our newsletter for weekly beauty tips and inspiration.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-neutral-800 text-white px-4 py-2 rounded-l-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-rose-500 flex-grow"
            />
            <Button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-r-md transition-colors">
              Join
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 pt-8 mt-8 text-center text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} SGC Blog. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
