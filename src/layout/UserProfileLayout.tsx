import React from 'react'
import { UserProfileComp } from '@components/middleSectionComp'
import { RightSideBar, LeftSideBar } from '@components/index'

const UserProfileLayout = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky gap-3 ">
      <LeftSideBar.LeftSideBar />
      <div className="flex w-full">
        <UserProfileComp.UserProfile />
        <RightSideBar.RightSidebar />
      </div>
    </div>
  )
}

export default UserProfileLayout