'app/(root)/SG-Admin/Layout.tsx'
import Sidebar from '@/components/Sidebar'
import type { ReactNode } from 'react'


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}
