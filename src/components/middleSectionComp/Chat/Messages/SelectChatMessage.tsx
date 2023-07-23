import React from 'react'

const SelectChatMessage = () => {
  return (
    <div className="flex w-full h-full items-center justify-center mx-auto">
      <div className="self-center max-w-[400px] mx-auto px-8 my-8">
        <div className="flex flex-col">
          <span className="mb-2 leading-9 font-extrabold text-[31px] text-left">
            Select a message
          </span>
          <span className="mb-7 text-left leading-5">
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </span>
          <a
            href="/messages/compose"
            className="flex items-center w-fit px-8 min-w-52px min-h-52px bg-primary-base rounded-full hover:bg-primary-dark duration-200"
          >
            <span className="text-white font-bold">New message</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SelectChatMessage