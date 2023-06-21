import { useNavigate } from "react-router-dom";
import { BackIcon } from "@icons/Icon";

interface IProps {
    title: string;
}

const ProfileHeader = ({title}:IProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="sticky top-0 z-30">
      <div className="h-auto backdrop-blur-md bg-white/80">
        <div className="h-full">
          <div className="flex flex-row gap-5 items-center cursor-pointer z-10 p-3">
            <div className="relative leading-5">
              <button onClick={handleBack}>
                <div className="w-10 h-10 hover:bg-gray-extraLight duration-150 rounded-full flex justify-center items-center">
                  <BackIcon className="w-5 h-5" />
                </div>
              </button>
            </div>
            <span className="text-xl leading-6 font-bold max-w-sm truncate">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
