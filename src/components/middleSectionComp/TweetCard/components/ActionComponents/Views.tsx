import { formatNumber } from "@utils/formatNumber";
import { AnalyticsIcon } from "@icons/Icon";
import { useModal } from "contexts/ModalContext";
import { ViewsModal } from "@components/middleSectionComp/DialogModals/TweetModals/TweetStats";

interface IProps {
  tweet: ITweet;
}

const Views = ({ tweet }: IProps) => {
  const {openModal, closeModal} = useModal()

  const handleViews = () => {
    openModal(<ViewsModal closeModal={closeModal} />)
  }

  return (
    <button
      title="View"
      onClick={(e) => {
        e.stopPropagation();
        handleViews()
      }}
      className="group h-5 min-h-max"
    >
      <div className="flex flex-row">
        <div className="flex relative">
          <div className="absolute top-0 right-0 left-0 bottom-0 -m-2 rounded-full group-hover:bg-blue-base/30 duration-150" />
          <AnalyticsIcon
            className={
              "w-5 h-5 text-[color:var(--color-base-secondary)] group-hover:text-blue-base"
            }
          />
        </div>
        <div className="inline-flex">
          <span className="px-3 text-sm text-[color:var(--color-base-secondary)] group-hover:text-blue-base">
            {formatNumber(tweet?.view)}
          </span>
        </div>
      </div>
    </button>
  );
};

export default Views;
