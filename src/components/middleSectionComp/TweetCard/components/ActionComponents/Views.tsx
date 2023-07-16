import { formatNumber } from "@utils/formatNumber";
import { AnalyticsIcon } from "@icons/Icon";

interface IProps {
  tweet: ITweet;
}

const Views = ({ tweet }: IProps) => {
  return (
    <button title="View" className="group h-5 min-h-max">
      <div className="flex flex-row">
        <div className="inline-flex relative text-gray-dark group-hover:text-primary-base duration-150">
          <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
          <AnalyticsIcon className={"w-5 h-5"} />
        </div>
        <div className="inline-flex  group-hover:text-primary-base">
          <span className="px-3 text-sm">{formatNumber(tweet?.view)}</span>
        </div>
      </div>
    </button>
  );
};

export default Views;
