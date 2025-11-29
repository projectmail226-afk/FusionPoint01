import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import Storiesbar from '../components/Storiesbar'
import PostCard from '../components/PostCard'
import RecentMessages from '../components/RecentMessages'

const Feed = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeeds = () => {
    // Simulated fetch for optimization
    requestAnimationFrame(() => {
      setFeeds(dummyPostsData)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8 transition-all duration-300 ease-out">

      {/* Stories + Posts */}
      <div className="animate-fadeIn">
        <Storiesbar />
        <div className="p-4 space-y-6">
          {feeds.map((post, index) => (
            <PostCard key={post._id || index} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="max-xl:hidden animate-slideIn">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow-md border border-slate-200">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            className="w-[75px] h-[50px] rounded-md object-cover"
            alt="Sponsored"
            loading="lazy"
          />
          <p className="text-slate-600 font-medium">Email Marketing</p>
          <p className="text-slate-400 leading-snug">
            SuperCharge your marketing with a powerful, easy-to-use platform
            built for results.
          </p>
        </div>

        {/* Recent messages section */}
        <div className="mt-4">
          <RecentMessages />
        </div>
      </div>
    </div>
  )
}

export default Feed
