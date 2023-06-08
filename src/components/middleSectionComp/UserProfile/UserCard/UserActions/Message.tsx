import React from 'react'
import { MessagesIcon } from '@icons/Icon'

const Message = () => {
  return (
    <div className="min-h-[36px] relative">
        <button
            className="cursor-not-allowed p-2 border rounded-full hover:bg-gray-extraLight duration-200"
        >
            <MessagesIcon className='w-5 h-5' />
      </button>
    </div>
  )
}

export default Message