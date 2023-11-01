import React from "react";
import { HeaderComp } from "..";
import Notifications from "./NotificationList";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "@redux/slices/userSlice";
import { RootState } from "@redux/config/store";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (reduxUser?.notifications?.length) {
      dispatch(clearNotification());
    }
  }, [dispatch, reduxUser]);

  return (
    <div className="container max-w-600px w-full border-x-2 border-[color:var(--background-third)]">
      <HeaderComp.Header pageType="Profile" headerTitle="Notifications" />
      <Notifications />
    </div>
  );
};

export default NotificationsPage;
