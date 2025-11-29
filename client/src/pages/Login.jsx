import React from 'react'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Background Image */}
      <img
        src={assets.bgImage}
        alt="Background"
        className="absolute inset-0 -z-10 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />

      {/* Left Side: Branding */}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-12 object-contain select-none"
          draggable="false"
        />

        <div>
          <div className="flex items-center gap-3 mb-4 max-md:mt-10">
            <img
              src={assets.group_users}
              alt="Users"
              className="h-8 md:h-10 select-none"
              draggable="false"
            />
            <div>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 text-amber-500"
                      fill="currentColor"
                    />
                  ))}
              </div>
              <p className="text-indigo-900/90 text-sm md:text-base">
                Used by 12k+ developers
              </p>
            </div>
          </div>

          <h1 className="text-3xl md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent leading-tight">
            More than just friends truly connect
          </h1>

          <p className="text-xl md:text-3xl text-indigo-900/95 max-w-[18rem] md:max-w-md">
            Connect with global community on FusionPoint.
          </p>
        </div>

        <span className="md:h-10"></span>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <SignIn />
      </div>
    </div>
  )
}

export default Login
