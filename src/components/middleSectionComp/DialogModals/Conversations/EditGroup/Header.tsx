import { CancelIcon } from "@icons/Icon";
import React from "react";

interface IProps {
  isLoading: boolean;
  isChanges: () => boolean;
  handleSave: () => void;
  closeModal: () => void;
}

const EditGroupHeader = ({
  isLoading,
  isChanges,
  handleSave,
  closeModal,
}: IProps) => {
  let isChange = isChanges();

  return (
    <div className="flex flex-row h-[53px] justify-between py-3 px-1 pr-3 bg-white border-gray-200">
      <div className="flex flex-row items-center gap-3">
        <button
          title="Close"
          type="button"
          onClick={closeModal}
          className="p-3 hover:bg-gray-extraLight rounded-full"
        >
          <CancelIcon className={"w-5 h-5"} />
        </button>
        <div>
          <span className="text-xl leading-6 font-bold">
            <h2>Edit</h2>
          </span>
        </div>
      </div>

      <div className="leading-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={!isChange || isLoading}
          className="disabled:opacity-50 bg-black text-white py-2 px-4 rounded-full font-bold"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditGroupHeader;
