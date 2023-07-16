import React from "react";
import { HeaderComp } from "..";
import Notifications from "./NotificationList";

const NotificationsPage = () => {
  return (
    <div className="container max-w-600px w-full border-x">
      <HeaderComp.Header pageType="Profile" headerTitle="Notifications" />
      <Notifications />
    </div>
  );
};

export default NotificationsPage;
