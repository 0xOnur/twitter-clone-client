import { useState, useEffect } from "react";
import { HeaderComp } from "@components/middleSectionComp";
import { TweetComposer } from "../ComposerComp";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";

interface IProps {
  isAuthenticated: boolean;
}

const HomeFeed = ({isAuthenticated}: IProps) => {
  const localIsForYou = localStorage.getItem("isForYou");
  const [isForYou, setIsForYou] = useState(localIsForYou !== null ? JSON.parse(localIsForYou) : true);
  
  useEffect(() => {
    localStorage.setItem("isForYou", JSON.stringify(isForYou));
  }, [isForYou]);

  return (
    <div className="container max-w-600px border-x">
      <HeaderComp.Header
        pageType="Home"
        isForYou={isForYou}
        setIsForYou={setIsForYou}
      />
      {/* composer shows when user is Authenticated */}
      {isAuthenticated && (
        <div className="px-4 border-b">
          <TweetComposer composerMode="tweet" />
        </div>
      )}

      {isForYou && <ForYouFeed />}

      {!isForYou && isAuthenticated && <FollowingFeed />}

    </div>
  );
};
export default HomeFeed;
