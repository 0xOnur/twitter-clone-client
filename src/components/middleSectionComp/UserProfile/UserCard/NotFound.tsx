import React from 'react'

interface IProps {
    username: string;
}

const NotFound = ({username}: IProps) => {
  return (
    <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="relative">
            <div className="pb-[33%] bg-gray-defaultCover" />
            <div className="absolute -bottom-1/3 left-4 w-[145px] h-[145px] rounded-full border-4 border-white bg-gray-50" />
          </div>
          <div className="flex flex-col py-3 px-4 mt-[10%]">
            <div className="flex flex-row items-center">
              <span className="text-xl font-extrabold">@{username}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-10 px-5 my-8 mx-auto max-w-sm">
          <div className="flex flex-col">
            <span className="mb-2 text-3xl font-bold">
              This account doesn’t exist
            </span>
            <span>Try searching for another.</span>
          </div>
        </div>
      </div>
  )
}

export default NotFound