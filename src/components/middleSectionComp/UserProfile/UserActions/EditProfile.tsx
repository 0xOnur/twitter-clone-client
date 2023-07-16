import { EditProfileModal } from "@components/middleSectionComp/DialogModals";
import { useState } from "react";

interface IProps {
  user: IUser;
}

const EditProfile = ({ user }: IProps) => {
  const [showModal, setShowModal] = useState(false);

  if (showModal) {
    return <EditProfileModal user={user} isOpen={showModal} onClose={() => setShowModal(false)} />;
  }

  return (
    <div className="absolute top-0 py-3 px-4 right-0">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-base leading-5 font-bold border rounded-full hover:bg-gray-lightest duration-200"
      >
        Edit profile
      </button>
    </div>
  );
};

export default EditProfile;
