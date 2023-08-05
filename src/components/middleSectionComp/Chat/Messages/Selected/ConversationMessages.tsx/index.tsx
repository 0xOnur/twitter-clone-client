import useGetMessages from "@hooks/Queries/Chat/useGetMessages";
import { useInView } from "react-intersection-observer";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { useEffect, useRef } from "react";
import Message from "./Message";

interface IProps {
  isGroupChat: boolean;
  conversationId: string;
  reduxUser: UserState;
}

const ConversationMessages = ({
  conversationId,
  isGroupChat,
  reduxUser,
}: IProps) => {
  //  Fetch messages ref
  const { ref, inView } = useInView();

  // Scroll ref
  const myRef = useRef<HTMLDivElement>(null);

  const {
    data,
    status,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetMessages({ conversationId: conversationId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage]);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
    }
  }, [data]);

  if (status === "loading") {
    return (
      <div className="flex w-full mt-20 items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex flex-col-reverse" ref={myRef}>
        {data.pages.map((page, index) => (
          <div key={index} className="flex flex-col-reverse">
            {page.data.map((message: IMessage) => (
              <Message
                key={message._id}
                message={message}
                isMine={message.sender._id === reduxUser.user._id}
                isGroupChat={isGroupChat}
              />
            ))}
          </div>
        ))}

        {isFetchingNextPage && (
          <div className="flex w-full mt-20 items-center justify-center">
            <LoadingIcon />
          </div>
        )}
        <div ref={ref} className="h-1" />
      </div>
    );
  }

  return null;
};

export default ConversationMessages;
