import { UserState } from "@redux/slices/userSlice";
import NormalHeader from "./NormalHeader";
import GroupHeader from "./GroupHeader";
import InfoHeader from "./InfoHeader";

interface IProps {
  reduxUser: UserState;
  isInfo?: boolean;
  chat: IChat;
}

const Header = ({ chat, isInfo, reduxUser }: IProps) => {
  const isGroupChat = chat.isGroupChat;

  switch (isGroupChat) {
    case true:
      return (
        <>
          {isInfo ? (
            <InfoHeader isGroupChat={chat.isGroupChat} />
          ) : (
            <GroupHeader chat={chat} reduxUser={reduxUser} />
          )}
        </>
      );
    case false:
      return (
        <>
          {isInfo ? (
            <InfoHeader isGroupChat={chat.isGroupChat} />
          ) : (
            <NormalHeader chat={chat} reduxUser={reduxUser} />
          )}
        </>
      );
  }
};

export default Header;
