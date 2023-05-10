import React, { useState } from "react";
import { HeaderComp } from "@components/middleSectionComp";
import TweetList from "./TweetList";
import { TweetComposer } from "../ComposerComp";

interface IProps {
  isAuthenticated: boolean;
}

const HomeFeed = ({isAuthenticated}: IProps) => {
  const [isForYou, setIsForYou] = useState(false);
  
  return (
    <div className="container max-w-600px border-x">
      <HeaderComp.Header
        pageType="home"
        isForYou={isForYou}
        setIsForYou={setIsForYou}
      />
      {/* composer shows when user is Authenticated */}
      {isAuthenticated && (
        <div className="px-4">
          <TweetComposer composerMode="tweet" />
        </div>
      )}

      {/* There is List all Tweets */}
      <TweetList isAuthenticated={isAuthenticated} />
    </div>
  );
};
export default HomeFeed;
