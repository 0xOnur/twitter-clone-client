import { AddPeopleModal } from "@components/middleSectionComp/DialogModals";
import { UserPreviewCard } from "@components/middleSectionComp/UserProfile";
import { UserState } from "@redux/slices/userSlice";
import { useModal } from "contexts/ModalContext";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  otherParticipants: {
    user: IUser;
    hasLeft: boolean;
    isPinned: boolean;
  }[];
}

const GroupPeople = ({ chat, reduxUser, otherParticipants }: IProps) => {
  const {openModal, closeModal} = useModal()

  const handleAddPeople = () => {
    openModal(<AddPeopleModal group={chat} closeModal={closeModal} />)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="bg-gray-extraLight h-px my-1" />
      </div>

      <div className="flex justify-between py-3 px-4">
        <h2 className="font-bold text-xl">People</h2>
      </div>

      <div className="flex flex-col">
        {otherParticipants.map((participant) => (
          <UserPreviewCard
            key={participant.user._id}
            reduxUser={reduxUser}
            user={participant.user}
            avatarSize="w-10 h-10"
          />
        ))}
      </div>

      <div className="flex w-full hover:bg-primary-extraLight duration-200">
        <button
          onClick={handleAddPeople}
          className="flex w-full min-h-[48px] p-4 justify-center text-primary-base"
        >
          Add people
        </button>
      </div>
    </div>
  );
};

export default GroupPeople;
