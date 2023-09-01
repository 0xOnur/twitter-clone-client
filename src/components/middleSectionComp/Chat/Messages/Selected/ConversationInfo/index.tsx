import Header from "../Header";
import { UserState } from "@redux/slices/userSlice";
import EditGroup from "./EditGroup";
import { UserPreviewCard } from "@components/middleSectionComp/UserProfile";
import GroupPeople from "./GroupPeople";
import ConversationSettings from "./ConversationSettings";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const ConversationInfo = ({ chat, reduxUser }: IProps) => {
  const otherParticipants =
    chat.participants.length > 1
      ? chat.participants.filter(
          (participant) => participant.user._id !== reduxUser.user._id
        )
      : [];

  return (
    <div className="flex flex-col w-full h-screen relative">
      <div className="absolute top-0 right-0 left-0 bottom-0 overflow-y-auto">
        <Header chat={chat} reduxUser={reduxUser} isInfo={true} />
        <div className="flex flex-col">
          {chat.isGroupChat ? (
            <EditGroup
              chat={chat}
              reduxUser={reduxUser}
              otherParticipants={otherParticipants}
            />
          ) : (
            otherParticipants.map((participant) => (
              <UserPreviewCard
                key={participant.user._id}
                reduxUser={reduxUser}
                user={participant.user}
                avatarSize="w-10 h-10"
              />
            ))
          )}

          {chat.isGroupChat && (
            <GroupPeople
              chat={chat}
              reduxUser={reduxUser}
              otherParticipants={otherParticipants}
            />
          )}

          <ConversationSettings
            chat={chat}
            otherParticipants={otherParticipants}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationInfo;
