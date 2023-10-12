import { EveryoneIcon, TwiiterCircleIcon, SelectedIcon } from "@icons/Icon";
import { setSettings } from "@redux/slices/composerSlice";
import { useDispatch } from "react-redux";

interface IProps {
  composerSettings: {
    audience: "everyone" | "specificUsers";
    whoCanReply: "everyone" | "following" | "mentioned";
  };
  onClose: () => void;
}

export const AudienceMenu = ({ composerSettings, onClose }: IProps) => {
  const dispatch = useDispatch();

  const handleSetAudience = (value: "everyone" | "specificUsers") => {
    dispatch(setSettings({ ...composerSettings, audience: value }));
    onClose();
  };

  return (
    <div className="flex flex-col py-3">
      <div className="px-3 py-1">
        <span className="text-lg font-bold">Choose Audience</span>
      </div>

      <button
        className="hover:bg-gray-rightbar"
        onClick={() => handleSetAudience("everyone")}
      >
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="inline-flex items-center">
            {}
            <div className="flex justify-center items-center bg-primary-base w-10 h-10 mr-3 rounded-full">
              <EveryoneIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">Everyone</span>
          </div>
          {composerSettings.audience === "everyone" && (
            <div>
              <span className="text-primary-base">
                {" "}
                <SelectedIcon className={"w-5 h-5"} />{" "}
              </span>
            </div>
          )}
        </div>
      </button>

      <button
        disabled={true}
        className="hover:bg-gray-rightbar cursor-not-allowed"
        onClick={() => handleSetAudience("specificUsers")}
      >
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="inline-flex items-center">
            <div className="flex justify-center items-center bg-green-500 w-10 h-10 mr-3 rounded-full">
              <TwiiterCircleIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">Twitter Circle</span>
          </div>
          {composerSettings.audience === "specificUsers" && (
            <div>
              <span className="text-primary-base">
                {" "}
                <SelectedIcon className={"w-5 h-5"} />{" "}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default AudienceMenu;
