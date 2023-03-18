import React from 'react'
import { SearchIcon } from "../../icons/Icon";

const RightSidebar = () => {
  return (
    <aside className="h-screen sticky top-0  flex-col justify-between w-7/12  hidden lg:inline-block">
      <div className="flex items-center space-x-4 p-3 m-3 bg-gray-rightbar rounded-full text-gray-600 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary-base focus-within:text-primary-base">
        <SearchIcon className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="placeholder-gray-dark font-semibold bg-transparent focus:outline-none w-full text-sm"
        />
      </div>
      <div className="mt-5">
         {/* <Trends section after search input /> */}
      </div>
    </aside>
  )
}

export default React.memo(RightSidebar);