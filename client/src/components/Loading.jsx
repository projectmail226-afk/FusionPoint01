import React from 'react'

const Loading = ({ height = '100vh' }) => {
  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ height }}
      aria-label="Loading..."
    >
      <div
        className="w-10 h-10 rounded-full border-[3px] border-purple-500 border-t-transparent animate-spin"
      />
    </div>
  )
}

export default Loading
