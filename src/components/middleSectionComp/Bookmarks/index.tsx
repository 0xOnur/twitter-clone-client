import { HeaderComp } from "..";
import BookmarkTweets from "./BookmarkTweets";

const Bookmarks = () => {
  return (
    <div className="container max-w-600px w-full border-x-2 border-[color:var(--background-third)]">
      <HeaderComp.Header pageType="Profile" headerTitle="Bookmarks" />
      <BookmarkTweets />
    </div>
  );
};

export default Bookmarks;
