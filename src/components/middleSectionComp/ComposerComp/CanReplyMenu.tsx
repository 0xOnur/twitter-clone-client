import React from "react";
import {
  EveryoneIcon,
  TwiiterCircleIcon,
  SelectedIcon,
  MentionIcon,
} from "@icons/Icon";
import { useDispatch } from "react-redux";
import { setSettings } from "@redux/slices/composerSlice";

interface IProps {
  composerSettings: {
    audience: "everyone" | "specificUsers";
    whoCanReply: "everyone" | "following" | "mentioned";
  };
  onClose: () => void;
}

const CanReplyMenu = ({ composerSettings, onClose }: IProps) => {
  const dispatch = useDispatch();

  const handleItemClick = (value: "everyone" | "following" | "mentioned") => {
    // composerSettings.whoCanReply = value;
    onClose();
    dispatch(setSettings({ ...composerSettings, whoCanReply: value }));
  };

  return (
    <div className="flex flex-col z-20 pt-3 w-80 bg-[color:var(--background-primary)] rounded-2xl shadow-box overflow-hidden">
      <div className="px-3 py-1">
        <span className="text-lg font-bold block">Who can reply?</span>
        <span>
          Choose who can reply to this Tweet. Anyone mentioned can always reply.
        </span>
      </div>

      <button
        className="hover:bg-[color:var(--background-secondary)]"
        onClick={() => handleItemClick("everyone")}
      >
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="flex items-center">
            <div className="flex justify-center w-10 h-10 mr-3 items-center rounded-full bg-[color:var(--color-primary)]">
              <EveryoneIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">Everyone</span>
          </div>
          {composerSettings.whoCanReply === "everyone" && (
            <div>
              <span className="text-[color:var(--color-primary)]">
                <SelectedIcon className={"w-5 h-5"} />
              </span>
            </div>
          )}
        </div>
      </button>

      <button
        disabled={true}
        className="hover:bg-[color:var(--background-secondary)] cursor-not-allowed"
        onClick={() => handleItemClick("following")}
      >
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="flex items-center">
            <div className="flex justify-center w-10 h-10 mr-3 items-center rounded-full bg-[color:var(--color-primary)]">
              <TwiiterCircleIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">People you follow</span>
          </div>
          {composerSettings.whoCanReply === "following" && (
            <div className="">
              <span className="[color:var(--color-primary)]">
                <SelectedIcon className={"w-5 h-5"} />
              </span>
            </div>
          )}
        </div>
      </button>

      <button
        disabled={true}
        className="hover:bg-[color:var(--background-secondary)] cursor-not-allowed"
        onClick={() => handleItemClick("mentioned")}
      >
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="flex items-center">
            <div className="flex justify-center w-10 h-10 mr-3 items-center rounded-full bg-[color:var(--color-primary)]">
              <MentionIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">Only people you mention</span>
          </div>
          {composerSettings.whoCanReply === "mentioned" && (
            <div className="">
              <span className="[color:var(--color-primary)]">
                <SelectedIcon className={"w-5 h-5"} />
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default CanReplyMenu;
