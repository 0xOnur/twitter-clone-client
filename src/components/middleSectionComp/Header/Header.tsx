import React from 'react'
import HomeHeader from "./HomeHeader"
import TweetHeader from './TweetHeader';
import ProfileHeader from './ProfileHeader';

interface Props {
    pageType: "home" | "TweetDetails" | "Profile";
    headerTitle?: string;
    isForYou?: boolean;
    setIsForYou?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({pageType, headerTitle, isForYou, setIsForYou}: Props) => {
    const renderHeader = () => {
      switch (pageType) {
        case "home":
          return <HomeHeader isForYou={isForYou} setIsForYou={setIsForYou} />;
        case "TweetDetails":
          return <TweetHeader />;
        case "Profile":
          return <ProfileHeader displayName={headerTitle!} />
        default:
          return null;
      }
    }
    return (
      renderHeader()
    );
  };

export default Header