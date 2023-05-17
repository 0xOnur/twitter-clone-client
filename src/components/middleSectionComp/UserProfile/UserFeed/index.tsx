import React from "react";
import { useParams } from "react-router-dom";
import NavigationHeader from "./NavigationHeader";
import TweetsTab from "./TweetsTab";
import RepliesTab from "./RepliesTab";

type Params = {
  tab: "replies" | "media" | "likes";
};

const UserFeed = () => {
  const { username } = useParams();
  const { tab = "tweets" } = useParams<Params>();

  switch (tab) {
    case "tweets":
      return (
        <>
          <NavigationHeader username={username!} tab={tab!} />
          <TweetsTab username={username!} />
        </>
      );
    case "replies":
      return (
        <>
          <NavigationHeader username={username!} tab={tab!} />
          <RepliesTab username={username!} />
        </>
      );
    default:
      break;
  }

  return null;
};

export default UserFeed;
