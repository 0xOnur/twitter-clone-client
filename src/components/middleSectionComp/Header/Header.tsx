import React from 'react'
import HomeHeader from "./HomeHeader"
import TweetHeader from './TweetHeader';

interface Props {
    pageType: "home" | "TweetDetails";
    isForYou?: boolean
    setIsForYou?: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({pageType, isForYou, setIsForYou}: Props) => {
    const renderHeader = () => {
      switch (pageType) {
        case "home":
          return <HomeHeader isForYou={isForYou} setIsForYou={setIsForYou} />;
        case "TweetDetails":
          return <TweetHeader />;
        default:
          return null;
      }
    }
    return (
      renderHeader()
    );
  };

export default Header