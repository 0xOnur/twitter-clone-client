import MessagesPage from "@components/middleSectionComp/Chat/MessagesPage";
import { LeftSideBar } from "@components/leftSidebarComp";

const MessagesLayout = () => {
  return (
    <div>
      <div className="flex min-h-screen max-w-7xl mx-auto sticky overflow-x-hidden">
        <LeftSideBar />
        <div className="flex flex-row gap-5 min-h-full w-full">
          <MessagesPage />
        </div>
      </div>
    </div>
  );
};

export default MessagesLayout;
