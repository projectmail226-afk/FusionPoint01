import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'

const Layout = () => {
  const user = dummyUserData
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) return <Loading />

  return (
    <div className="w-full flex h-screen relative overflow-hidden">

      {/* Sidebar */}
      <Sidebar SidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 bg-slate-50 transition-all duration-300 ease-out">
        <Outlet />
      </div>

      {/* Sidebar toggle button */}
      <div className="sm:hidden">
        {sidebarOpen ? (
          <X
            className="absolute top-3 right-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 active:scale-90 transition"
            onClick={() => setSidebarOpen(false)}
          />
        ) : (
          <Menu
            className="absolute top-3 right-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 active:scale-90 transition"
            onClick={() => setSidebarOpen(true)}
          />
        )}
      </div>
    </div>
  )
}

export default Layout
