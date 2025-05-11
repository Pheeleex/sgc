'use client'

import { Menu, FileText, Plus, Folder, Image, MessageSquare, BarChart2, Users, Settings, Calendar, Database, Star, Coffee } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      {/* Mobile Menu Icon */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-gray-100 shadow-sm border border-gray-200 hover:bg-gray-200 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Content Management</h2>
            <p className="text-xs text-gray-500 mt-1">Dashboard</p>
          </div>

          <nav className="flex-1 py-4 px-3 overflow-y-auto">
            {/* Content */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">Content</p>
              <div className="space-y-1">
                <Link href="./posts" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <FileText className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>All Posts</span>
                </Link>
                <Link href="./create" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Plus className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Create New</span>
                </Link>
                <Link href="./categories" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Folder className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Categories</span>
                </Link>
                <Link href="./media" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Image className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Media Library</span>
                </Link>
              </div>
            </div>

            {/* Engagement */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">Engagement</p>
              <div className="space-y-1">
                <Link href="./comments" className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                    <span>Comments</span>
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium rounded-full px-2 py-0.5">12</span>
                </Link>
                <Link href="./reviews" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Star className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Reviews</span>
                </Link>
                <Link href="./sponsors" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Coffee className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Sponsors</span>
                </Link>
              </div>
            </div>

            {/* Analytics */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">Analytics</p>
              <div className="space-y-1">
                <Link href="./statistics" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <BarChart2 className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Statistics</span>
                </Link>
                <Link href="./calendar" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Editorial Calendar</span>
                </Link>
              </div>
            </div>

            {/* Settings */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">Administration</p>
              <div className="space-y-1">
                <Link href="./users" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Users className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Users</span>
                </Link>
                <Link href="./theme" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Database className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>System</span>
                </Link>
                <Link href="./settings" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                  <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">JD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Jane Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <button className="ml-auto p-1 rounded-full hover:bg-gray-100">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Content Management</h2>
          <p className="text-xs text-gray-500 mt-1">Dashboard</p>
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">Content</p>
            <div className="space-y-1">
              <Link href="/SG-Admin/posts" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <FileText className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>All Posts</span>
              </Link>
              <Link href="/SG-Admin/create" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Plus className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Create New</span>
              </Link>
              <Link href="/SG-Admin/categories" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Folder className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Categories</span>
              </Link>
              <Link href="/SG-Admin/media" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Image className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Media Library</span>
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">Engagement</p>
            <div className="space-y-1">
              <Link href="/SG-Admin/comments" className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span>Comments</span>
                </div>
                <span className="bg-blue-100 text-blue-600 text-xs font-medium rounded-full px-2 py-0.5">12</span>
              </Link>
              <Link href="/SG-Admin/reviews" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Star className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Reviews</span>
              </Link>
              <Link href="/SG-Admin/sponsors" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Coffee className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Sponsors</span>
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">Analytics</p>
            <div className="space-y-1">
              <Link href="/SG-Admin/statistics" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <BarChart2 className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Statistics</span>
              </Link>
              <Link href="/SG-Admin/calendar" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Calendar className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Editorial Calendar</span>
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-2">Administration</p>
            <div className="space-y-1">
              <Link href="/SG-Admin/users" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Users className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Users</span>
              </Link>
              <Link href="/SG-Admin/theme" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Database className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>System</span>
              </Link>
              <Link href="/SG-Admin/settings" className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 group">
                <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Jane Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button className="ml-auto p-1 rounded-full hover:bg-gray-100">
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}