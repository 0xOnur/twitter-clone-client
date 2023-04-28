import React from 'react'
import { UserProfileComp } from '@components/middleSectionComp'
import { RightSidebar, LeftSideBar } from '@components/index'

const UserProfileLayout = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky">
      <LeftSideBar />
      <div className="flex w-full">
        <UserProfileComp.UserProfile />
        <RightSidebar />
      </div>
    </div>
  )
}

export default UserProfileLayout