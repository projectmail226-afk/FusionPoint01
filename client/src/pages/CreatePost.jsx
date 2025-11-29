import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Image, X } from 'lucide-react'
import toast from 'react-hot-toast'

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const user = dummyUserData

  const handleSubmit = async () => {
    if (!content.trim() && images.length === 0) {
      toast.error('Post cannot be empty')
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate upload

      setContent('')
      setImages([])
      return true
    } catch (error) {
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    const valid = files.filter(file => file.type.startsWith('image/'))
    if (valid.length !== files.length) {
      toast.error('Only image files allowed')
    }

    setImages(prev => [...prev, ...valid])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Post</h1>
          <p className="text-slate-600">Share your thoughts with the world</p>
        </div>

        {/* Card */}
        <div className="max-w-xl bg-white p-6 rounded-xl shadow-md space-y-4">

          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile_picture}
              alt=""
              className="w-12 h-12 rounded-full shadow"
            />
            <div>
              <h2 className="font-semibold">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full resize-none h-20 mt-4 text-sm outline-none placeholder-gray-400"
            placeholder="What's happening?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((image, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-20 rounded-md object-cover"
                    alt=""
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setImages(prev => prev.filter((_, i) => i !== idx))
                    }
                    className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">

            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              <Image className="w-6 h-6" />
            </label>

            <input
              type="file"
              id="images"
              accept="image/*"
              hidden
              multiple
              onChange={handleImageUpload}
            />

            <button
              disabled={loading}
              onClick={() =>
                toast.promise(
                  handleSubmit(),
                  {
                    loading: 'Uploading...',
                    success: <p>Post Added</p>,
                    error: <p>Post Not Added</p>,
                  }
                )
              }
              className={`text-sm px-8 py-2 rounded-md font-medium transition ${
                loading
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 text-white'
              }`}
            >
              {loading ? 'Posting...' : 'Publish Post'}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePost
