import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from '@clerk/clerk-react'

const Sidebar = ({ SidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const user = dummyUserData
  const { signOut } = useClerk()

  return (
    <>
      {/* BLUR OVERLAY (mobile only) */}
      {SidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
            fixed inset-0 bg-black/30 backdrop-blur-sm
            sm:hidden z-10 transition-opacity duration-300
          "
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center
          max-sm:fixed max-sm:top-0 max-sm:bottom-0 max-sm:left-0
          z-20 shadow-lg
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${SidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        `}
      >
        {/* Top */}
        <div className="w-full">
          <img
            onClick={() => navigate('/')}
            src={assets.logo}
            alt="Logo"
            className="w-24 ml-7 my-2 cursor-pointer select-none active:scale-95 transition"
          />

          <hr className="border-gray-300 mb-8" />

          <MenuItems setSidebarOpen={setSidebarOpen} />

          <Link
            to="/create-post"
            className="
              flex items-center justify-center gap-2 py-2.5 mt-6 mx-4 rounded-lg
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:from-indigo-700 hover:to-purple-800
              text-white shadow-sm
              active:scale-95 transition
            "
          >
            <CirclePlus className="w-5 h-5" />
            Create Post
          </Link>
        </div>

        {/* Bottom */}
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <div
            className="flex gap-2 items-center cursor-pointer select-none"
            onClick={() => navigate('/profile')}
          >
            <UserButton />
            <div className="leading-tight">
              <h1 className="text-sm font-medium">{user.full_name}</h1>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </div>
          </div>

          <LogOut
            onClick={signOut}
            className="w-4 text-gray-400 hover:text-gray-700 active:scale-90 transition cursor-pointer"
          />
        </div>
      </div>
    </>
  )
}

export default Sidebar
