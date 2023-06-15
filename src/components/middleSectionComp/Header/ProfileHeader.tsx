import { useNavigate } from "react-router-dom";
import { BackIcon } from "@icons/Icon";

interface IProps {
    displayName: string;
}

const ProfileHeader = ({displayName}:IProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="sticky top-0 z-30">
      <div className="h-auto backdrop-blur-md bg-white/80">
        <div className="h-full">
          <div className="flex flex-row items-center cursor-pointer z-10 p-3">
            <div className="relative text-2xl w-14 leading-5">
              <button onClick={handleBack}>
                <div className="w-9 h-9 hover:bg-gray-extraLight duration-150 rounded-full flex justify-center items-center">
                  <BackIcon className="w-5 h-5" />
                </div>
              </button>
            </div>
            <span className="text-2xl font-bold max-w-sm truncate">{displayName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
