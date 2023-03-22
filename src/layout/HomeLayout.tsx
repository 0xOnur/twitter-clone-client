import React from 'react'
import LeftSideBar from '../companents/leftSidebarComp/LeftSidebar'
import MiddleFlow from '../companents/MiddleFlow'
import RightSideBar from '../companents/rightSidebarComp/RightSidebar'

const HomeLayout = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky gap-3 ">
      <LeftSideBar />
      <div className='flex w-full'>
        <MiddleFlow />
        <RightSideBar />
      </div>
    </div>
  )
}

export default React.memo(HomeLayout)