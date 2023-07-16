import { TweetDetailsComp, RightSidebar, LeftSideBar } from "@components/index";

interface IProps {
  isAuthenticated: boolean;
}

const TweetDetailsLayout = ({ isAuthenticated }: IProps) => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky">
      <LeftSideBar />
      <div className="flex flex-row gap-5 min-h-full w-full">
        <TweetDetailsComp.TweetDetails />
        <RightSidebar isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default TweetDetailsLayout;
