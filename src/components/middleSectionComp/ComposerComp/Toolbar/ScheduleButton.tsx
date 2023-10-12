import { ScheduleIcon } from "@icons/Icon";

const ScheduleButton = () => {
  return (
    <button
      type="button"
      disabled={true}
      className="p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-not-allowed"
    >
      <label className="cursor-not-allowed w-8 h-8">
        <ScheduleIcon className={"w-5 h-5 text-primary-base fill-current"} />
      </label>
    </button>
  );
};

export default ScheduleButton;
