import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationsCount } from "api/userApi";

export const useUnreadNotifications = (isAuthenticated: boolean) => {
    
  const notifCount = useQuery(["unreadNotifCount"], getUnreadNotificationsCount, {
    refetchOnWindowFocus: true,
    enabled: isAuthenticated,
    refetchInterval: 10000,
  });

  return {notifCount: notifCount.data};
};
