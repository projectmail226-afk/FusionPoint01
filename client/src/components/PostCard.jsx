import React, { useState } from 'react'
import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import { dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {

  const navigate = useNavigate()
  const currentUser = dummyUserData

  // Safe user fallback
  const user = post.user || {}

  // Highlight hashtags
  const postWithHashtags = post.content
    ?.replace(/(^|\s)(#[a-zA-Z0-9_]+)/g, '$1<span class="text-indigo-600">$2</span>')

  const [likes, setLikes] = useState(post.likes || [])

  const handlelike = () => {
    // Temporary local toggle (backend can be added later)
    if (likes.includes(currentUser._id)) {
      setLikes(likes.filter(id => id !== currentUser._id))
    } else {
      setLikes([...likes, currentUser._id])
    }
  }

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>

      {/* User Info */}
      <div
        onClick={() => navigate('/profile/' + user._id)}
        className='inline-flex items-center gap-3 cursor-pointer'
      >
        <img
          src={user.profile_picture}
          alt=''
          className='w-10 h-10 rounded-full shadow'
        />

        <div>
          <div className='flex items-center space-x-1'>
            <span>{user.full_name}</span>
            <BadgeCheck className='w-4 h-4 text-blue-500' />
          </div>

          <div className='text-gray-500 text-sm'>
            @{user.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <div
          className='text-gray-800 text-sm whitespace-pre-line'
          dangerouslySetInnerHTML={{ __html: postWithHashtags }}
        />
      )}

      {/* Images */}
      {post.image_urls?.length > 0 && (
        <div
          className={`grid gap-2 ${
            post.image_urls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
          }`}
        >
          {post.image_urls.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=''
              className={`w-full object-cover rounded-lg ${
                post.image_urls.length === 1 ? 'h-auto' : 'h-48'
              }`}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
        {/* Like */}
        <div className='flex items-center gap-1'>
          <Heart
            className={`w-4 h-4 cursor-pointer transition ${
              likes.includes(currentUser._id)
                ? 'text-red-500 fill-red-500'
                : ''
            }`}
            onClick={handlelike}
          />
          <span>{likes.length}</span>
        </div>

        {/* Comments */}
        <div className='flex items-center gap-1'>
          <MessageCircle className='w-4 h-4' />
          <span>{12}</span>
        </div>

        {/* Share */}
        <div className='flex items-center gap-1'>
          <Share2 className='w-4 h-4' />
          <span>{7}</span>
        </div>
      </div>

    </div>
  )
}

export default PostCard
