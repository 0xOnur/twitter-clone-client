import { useParams } from "react-router-dom";
import NavigationHeader from "./NavigationHeader";
import TweetsTab from "./TweetsTab";
import RepliesTab from "./RepliesTab";
import MediaTab from "./MediaTab";
import LikesTab from "./LikesTab";

type Params = {
  tab: "replies" | "media" | "likes";
};

const UserFeed = () => {
  const { username } = useParams();
  const { tab = "tweets" } = useParams<Params>();

  switch (tab) {
    case "tweets":
      return (
        <>
          <NavigationHeader username={username!} tab={tab!} />
          <TweetsTab username={username!} />
        </>
      );
    case "replies":
      return (
        <>
          <NavigationHeader username={username!} tab={tab!} />
          <RepliesTab username={username!} />
        </>
      );
      case "media":
        return (
          <>
            <NavigationHeader username={username!} tab={tab!} />
            <MediaTab username={username!} />
          </>
        )
        case "likes":
          return (
            <>
              <NavigationHeader username={username!} tab={tab!} />
              <LikesTab username={username!} />
            </>
          )
    default:
      break;
  }

  return null;
};

export default UserFeed;
