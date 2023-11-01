import { useDispatch, useSelector } from "react-redux";
import Conversations from "./Conversations";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import { RootState } from "@redux/config/store";
import React from "react";
import { clearMessageNotification } from "@redux/slices/userSlice";

const MessagesPage = () => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: RootState) => state.user);

  const { conversationId } = useParams();

  React.useEffect(() => {
    if (reduxUser?.messageNotifications?.length) {
      dispatch(clearMessageNotification());
    }
  }, [dispatch, reduxUser]);

  if (conversationId) {
    return (
      <div className="flex flex-row max-w-[990px] w-full">
         <div className="border-l-2 border-[color:var(--background-third)] w-full max-w-600px min-w-[320px] md:w-[390px] xl:w-[390px] hidden md:inline-block">
          <Conversations selectedChat={conversationId} />
        </div>
        <div className="border-x-2 border-[color:var(--background-third)] w-full max-w-600px">
          <Messages conversationId={conversationId} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row max-w-[990px] w-full">
      <div className="border-x-2 border-[color:var(--background-third)] w-full max-w-600px min-w-[320px] md:w-[390px] xl:w-[390px]">
        <Conversations />
      </div>
      <div className="border-r-2 border-[color:var(--background-third)] w-full max-w-600px hidden md:inline-block">
        <Messages />
      </div>
    </div>
  );
};

export default MessagesPage;
