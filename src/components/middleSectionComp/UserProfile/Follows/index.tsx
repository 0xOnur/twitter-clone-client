import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@customTypes/UserTypes";
import { HeaderComp } from "@components/middleSectionComp";
import { getUser } from "api/userApi";
import Followers from "./Followers";
import Following from "./Following";

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
      <HeaderComp.Header
        pageType="Profile"
        headerTitle={userQuery.data ? userQuery.data.displayName : "Profile"}
      />
      
      <HeaderComp.Header pageType="Follows" followsTab={followsTab} />

      {renderFollowsUsers()}
    </div>
  );
};

export default Follows;
