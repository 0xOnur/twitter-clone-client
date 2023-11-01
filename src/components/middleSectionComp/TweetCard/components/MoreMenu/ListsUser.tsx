import { ListsIcon } from "@icons/Icon";

interface IProps {
  tweet: ITweet;
}

const ListsUser = ({ tweet }: IProps) => {
  return (
    <button className="flex flex-row font-bold hover:bg-[color:var(--background-third)] cursor-not-allowed">
      <div className="flex flex-row py-3 px-4 items-center">
        <div className="mr-2">
          <ListsIcon className={"w-5 h-5"} />
        </div>
        <span>Add/remove @{tweet.author.username} from Lists</span>
      </div>
    </button>
  );
};

export default ListsUser;
