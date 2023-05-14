import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "api/userApi";
import { HeaderComp } from "@components/middleSectionComp";
import UserCard from "./UserCard";
import UserFeed from "./UserFeed"
import {IUser} from "@customTypes/UserTypes";

const UserProfile = () => {
  const username = useParams().username;

  const userQuery = useQuery<IUser>({
    queryKey: ["user", username],
    queryFn: () => getUser(username!),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container max-w-600px w-full border-x">
      <HeaderComp.Header pageType="Profile" headerTitle={userQuery.data ? userQuery.data.displayName! :  "Profile"} />
      <UserCard 
        isLoading={userQuery.isLoading}
        user={userQuery.data!}
        username={username!}
        error={userQuery.error}
      />
      <UserFeed />
    </div>
  );
};

export default UserProfile;
