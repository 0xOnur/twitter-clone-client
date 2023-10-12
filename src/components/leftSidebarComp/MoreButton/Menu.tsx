import { ListsIcon, TopicsIcon, TwiiterCircleIcon } from "@icons/Icon";
import CreatorStudio from "./CreatorStudio";
import ProfTools from "./ProfTools";
import Settings from "./Settings";

const Menu = () => {
  return (
    <div className="flex max-h-[400px] overflow-hidden border bg-white border-gray-200 shadow-xl rounded-3xl">
      <div className="overflow-y-auto flex-grow z-50 w-72">
        <div className="flex flex-col flex-grow overflow-y-auto font-bold text-lg">
          <button className="w-full">
            <div className="flex hover:bg-gray-dropdown rounded-t-2xl px-4 pb-3 pt-3">
              <TopicsIcon />
              <span className="pl-6">Topics</span>
            </div>
          </button>
          <button className="w-full">
            <div className="flex hover:bg-gray-dropdown  px-4 py-3">
              <ListsIcon className="w-7 h-7" />
              <span className="pl-6">Lists</span>
            </div>
          </button>
          <button className="w-full">
            <div className="flex hover:bg-gray-dropdown  px-4 py-3">
              <TwiiterCircleIcon className={"w-7 h-7"} />
              <span className="pl-6">Twitter Circle</span>
            </div>
          </button>
        </div>
        <div className="px-3 my-0.5">
          <hr />
        </div>

        <div className="flex flex-col font-bold">
          <CreatorStudio />
          <ProfTools />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Menu;
