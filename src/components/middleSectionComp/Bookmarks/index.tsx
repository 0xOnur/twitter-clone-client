import { HeaderComp } from "..";
import BookmarkTweets from "./BookmarkTweets";

const Bookmarks = () => {
  return (
    <div className="container max-w-600px w-full border-x">
      <HeaderComp.Header pageType="Profile" headerTitle="Bookmarks" />
      <BookmarkTweets />
    </div>
  );
};

export default Bookmarks;
