import { ScheduleIcon } from "@icons/Icon";

const ScheduleButton = () => {
  const hoverClassNames =
    "absolute left-0 top-0 w-full h-full rounded-full opacity-30 group-hover:bg-[color:var(--color-secondary)] rounded-full";
  return (
    <button
      title="Schedule"
      disabled={true}
      className="relative w-fit p-2 group cursor-not-allowed opacity-50"
    >
      <div className={hoverClassNames} />
      <span className="w-8 h-8">
        <ScheduleIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
      </span>
    </button>
  );
};

export default ScheduleButton;
