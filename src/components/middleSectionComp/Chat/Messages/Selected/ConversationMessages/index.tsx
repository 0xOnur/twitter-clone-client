import useGetMessages from "@hooks/Chat/Queries/useGetMessages";
import { useInView } from "react-intersection-observer";
import { LoadingIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { useEffect, useLayoutEffect, useRef } from "react";
import Message from "./Message";
import { RefetchError } from "@components/Others";

interface IProps {
  conversation: IChat;
  reduxUser: UserState;
  bottomMessagesRef: (node?: Element | null | undefined) => void;
  inView: boolean;
}

const ConversationMessages = ({
  conversation,
  reduxUser,
  bottomMessagesRef,
}: IProps) => {
  //  Fetch messages ref
  const { ref: fetchRef, inView: fetchInView } = useInView();

  // Scroll ref
  const myRef = useRef<HTMLDivElement>(null);

  const {
    data,
    status,
    refetch,
    hasNextPage,
    isRefetching,
    fetchNextPage,
    isInitialLoading,
    isFetchingNextPage,
  } = useGetMessages({ conversationId: conversation._id });

  useEffect(() => {
    if (fetchInView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchInView, fetchNextPage, hasNextPage]);

  useLayoutEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
    }
  }, [isInitialLoading, isRefetching]);

  if (status === "loading") {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return (
      <RefetchError refetch={refetch} />
    );
  }

  if (data) {
    return (
      <div className="flex flex-col-reverse pb-1" ref={myRef}>
        <div ref={bottomMessagesRef} />
        {data.pages.map((page, index) => (
          <div key={index} className="flex flex-col-reverse">
            {page.data.map((message: IMessage) => (
              <Message
                key={message._id}
                message={message}
                reduxUser={reduxUser}
                conversation={conversation}
                isMine={message.sender?._id === reduxUser.user?._id}
              />
            ))}
          </div>
        ))}

        {isFetchingNextPage && (
          <div className="flex w-full mt-20 items-center justify-center">
            <LoadingIcon />
          </div>
        )}

        {hasNextPage && <div ref={fetchRef} className="h-56" />}
      </div>
    );
  }

  return null;
};

export default ConversationMessages;
