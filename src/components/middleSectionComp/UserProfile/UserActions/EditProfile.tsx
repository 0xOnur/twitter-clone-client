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
        className="px-4 py-2 text-base leading-5 font-bold border rounded-full hover:bg-gray-lightest duration-200"
      >
        Edit profile
      </button>
    </div>
  );
};

export default EditProfile;
