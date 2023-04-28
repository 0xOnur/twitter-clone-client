import React from 'react'
import { TweetDetailsComp, RightSidebar, LeftSideBar  } from '@components/index'

const TweetDetailsLayout = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky">
      <LeftSideBar />
      <div className="flex w-full">
        <TweetDetailsComp.TweetDetails />
        <RightSidebar />
      </div>
    </div>
  )
}

export default TweetDetailsLayout