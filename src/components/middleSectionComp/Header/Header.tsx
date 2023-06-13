import React from 'react'
import HomeHeader from "./HomeHeader"
import TweetHeader from './TweetHeader';
import ProfileHeader from './ProfileHeader';
import FollowsHeader from './FollowsHeader';

interface Props {
    pageType: "Home" | "TweetDetails" | "Profile" | "Follows";
    headerTitle?: string;
    isForYou?: boolean;
    setIsForYou?: React.Dispatch<React.SetStateAction<boolean>>;
    followsTab?: "followers" | "following";
}

const Header = ({pageType, headerTitle, isForYou, setIsForYou, followsTab}: Props) => {
    const renderHeader = () => {
      switch (pageType) {
        case "Home":
          return <HomeHeader isForYou={isForYou} setIsForYou={setIsForYou} />;
        case "TweetDetails":
          return <TweetHeader />;
        case "Profile":
          return <ProfileHeader displayName={headerTitle!} />
        case "Follows": 
          return <FollowsHeader followsTab={followsTab!} />
        default:
          return null;
      }
    }
    return (
      renderHeader()
    );
  };

export default Header