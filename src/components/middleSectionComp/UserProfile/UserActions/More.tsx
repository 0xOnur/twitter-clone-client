import { useState, useEffect, useRef } from "react";
import { TreeDotIcon, WebsiteIcon } from "@icons/Icon";
import { IUser } from "@customTypes/UserTypes";
import useToast from "@hooks/useToast";

interface IProps {
  user: IUser;
}

const More = ({ user }: IProps) => {
  const { showToast } = useToast();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const copyProfileLink = () => {
    const profileURL = window.location.origin + `/${user.username}`;
    navigator.clipboard.writeText(profileURL);
    setShowMenu(false);
    showToast("Copied to clipboard", "success");
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu]);

  return (
    <div className="min-h-[36px] relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 border rounded-full hover:bg-gray-extraLight duration-200"
      >
        <TreeDotIcon className="w-5 h-5" />
      </button>
      {showMenu && (
        <div
          ref={menuRef}
          className="flex flex-col absolute z-10 top-0 right-0 w-fit bg-white border rounded-xl shadow-lg"
        >
          <button
            onClick={copyProfileLink}
            className="flex gap-2 w-full items-center py-3 px-4 rounded-xl hover:bg-gray-extraLight"
          >
            <WebsiteIcon className="w-5 h-5" />
            <span className="w-max">Copy link to profile</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default More;
