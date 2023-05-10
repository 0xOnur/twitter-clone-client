import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";
import { TweetDetailsComp, RightSidebar, LeftSideBar  } from '@components/index'

const TweetDetailsLayout = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky">
      <LeftSideBar />
      <div className="flex flex-row gap-5 min-h-full justify-between">
        <TweetDetailsComp.TweetDetails />
        <RightSidebar isAuthenticated={isAuthenticated} />
      </div>
    </div>
  )
}

export default TweetDetailsLayout