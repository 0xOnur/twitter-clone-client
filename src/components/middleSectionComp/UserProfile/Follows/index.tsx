import { HeaderComp } from "@components/middleSectionComp";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "api/userApi";
import Followers from "./Followers";
import Following from "./Following";
import Title from "routes/Title";

interface IProps {
  isAuthenticated: boolean;
  followsTab: "following" | "followers";
}

const Follows = ({ isAuthenticated, followsTab }: IProps) => {
  const username = useParams().username;

  const userQuery = useQuery<IUser>({
    queryKey: ["user", username],
    queryFn: () => getUser(username!),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const renderFollowsUsers = () => {
    switch (followsTab) {
      case "followers":
        return <Followers isAuthenticated={isAuthenticated} />;
      case "following":
        return <Following isAuthenticated={isAuthenticated} />;
      default:
        break;
    }
  };

  return (
    <div className="container max-w-600px w-full border-x">
      <Title
        title={`${
          followsTab === "followers" ? "People following" : "People followed by"
        } ${userQuery.data?.displayName} (@${
          userQuery.data?.username
        }) / Twitter`}
      />
      <div className="sticky top-0">
        <HeaderComp.Header
          pageType="Profile"
          headerTitle={userQuery.data ? userQuery.data.displayName : "Profile"}
        />

        <HeaderComp.Header pageType="Follows" followsTab={followsTab} />
      </div>
      {renderFollowsUsers()}
    </div>
  );
};

export default Follows;
