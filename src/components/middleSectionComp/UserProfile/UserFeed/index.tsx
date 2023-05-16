import React from 'react'
import { useParams } from "react-router-dom";
import NavigationHeader from './NavigationHeader';
import Tweets from './Tweets';

const UserFeed = () => {
  const { username } = useParams();
  const tab = useParams().tab || "tweets";

  return (
    <div>
      <NavigationHeader username={username!} tab={tab} />
      {tab === "tweets" && (
        <Tweets username={username!} />
      )}
    </div>
  )
}

export default UserFeed;