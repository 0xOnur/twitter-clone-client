import { RightSidebar, LeftSideBar, TweetQuotes } from "@components/index";
import Title from "routes/Title";

interface IProps {
  isAuthenticated: boolean;
}

const TweetQuotesLayout = ({ isAuthenticated }: IProps) => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky">
      <Title title="Quotes of this post / Twitter" />
      <LeftSideBar />
      <div className="flex flex-row gap-5 min-h-full w-full">
        <TweetQuotes isAuthenticated={isAuthenticated} />
        <RightSidebar isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default TweetQuotesLayout;
