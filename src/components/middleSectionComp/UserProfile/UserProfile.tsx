import { HeaderComp } from "@components/middleSectionComp";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard/Card";
import { getUser } from "api/userApi";
import UserFeed from "./UserFeed";

interface IProps {
  isAuthenticated:boolean;
}

const UserProfile = ({isAuthenticated}: IProps) => {
  const username = useParams().username;

  const userQuery = useQuery<IUser>({
    queryKey: ["user", username],
    queryFn: () => getUser(username!),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container max-w-600px w-full border-x">
      <HeaderComp.Header
        pageType="Profile"
        headerTitle={userQuery.data ? userQuery.data.displayName! : "Profile"}
      />
      <UserCard
        isLoading={userQuery.isLoading}
        user={userQuery.data!}
        username={username!}
        error={userQuery.error}
      />
      {userQuery.data && <UserFeed isAuthenticated={isAuthenticated} />}
    </div>
  );
};

export default UserProfile;
