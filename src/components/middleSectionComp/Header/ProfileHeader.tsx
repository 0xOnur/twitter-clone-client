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
      <div className="h-auto bg-[color:var(--background-primary-alpha)] backdrop-blur-md">
        <div className="h-full">
          <div className="grid grid-cols-[auto,1fr] gap-5 items-center cursor-pointer z-10 p-3">
            <div className="relative leading-5">
              <button onClick={handleBack}>
                <div className="flex justify-center items-center w-10 h-10 hover:bg-[color:var(--background-third)] duration-150 rounded-full">
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
