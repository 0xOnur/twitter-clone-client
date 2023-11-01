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
    <div className="flex flex-col w-64 bg-[color:var(--background-primary)] rounded-2xl z-20 shadow-box overflow-hidden">
      <div className="p-3">
        <span className="text-lg font-bold">Choose audience</span>
      </div>

      <button
        className="hover:bg-[color:var(--background-secondary)]"
        onClick={() => handleSetAudience("everyone")}
      >
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="flex items-center">
            <div className="flex justify-center items-center bg-[color:var(--color-primary)] w-10 h-10 mr-3 rounded-full">
              <EveryoneIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">Everyone</span>
          </div>
          {composerSettings.audience === "everyone" && (
            <div>
              <span>
                <SelectedIcon
                  className={"w-5 h-5 [color:var(--color-primary)]"}
                />
              </span>
            </div>
          )}
        </div>
      </button>

      <button
        disabled
        className="hover:bg-[color:var(--background-secondary)] cursor-not-allowed"
        onClick={() => handleSetAudience("specificUsers")}
      >
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="flex items-center">
            <div className="flex justify-center items-center bg-green-500 w-10 h-10 mr-3 rounded-full">
              <TwiiterCircleIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">Twitter Circle</span>
          </div>
          {composerSettings.audience === "specificUsers" && (
            <div>
              <span>
                <SelectedIcon className={"w-5 h-5 text-green-500"} />
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default AudienceMenu;
