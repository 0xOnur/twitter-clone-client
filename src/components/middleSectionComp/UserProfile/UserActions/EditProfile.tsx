import { EditProfileModal } from "@components/middleSectionComp/DialogModals";
import { useModal } from "contexts/ModalContext";

interface IProps {
  user: IUser;
}

const EditProfile = ({ user }: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleEditProfile = () => {
    openModal(<EditProfileModal user={user} closeModal={closeModal} />);
  };

  return (
    <div className="absolute top-0 py-3 px-4 right-0">
      <button
        onClick={handleEditProfile}
        className="min-h-[36px] min-w-[81px] px-4 rounded-full border-2 border-[color:var(--background-third)] bg-[color:var(--color-base)] hover:opacity-80 duration-200"
      >
        <span className="leading-5 font-bold text-[color:var(--background-primary)]">
          Edit profile
        </span>
      </button>
    </div>
  );
};

export default EditProfile;
