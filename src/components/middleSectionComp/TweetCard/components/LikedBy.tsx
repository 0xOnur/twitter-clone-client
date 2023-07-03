import { IUser } from "@customTypes/UserTypes";
import { LikeIcon } from "@icons/Icon";

interface IProps {
  likedUser: IUser;
}

const LikedBy = ({ likedUser }: IProps) => {
  return (
    <a
      href={`/${likedUser.username}`}
      className="flex flex-row relative items-center -mt-1 mb-1"
    >
      <div className="basis-12 mr-3">
        <span className="float-right">
          <LikeIcon className={"w-4 h-4"} />
        </span>
      </div>
      <span className="font-semibold text-gray-600 leading-5 hover:underline">
        {likedUser.displayName} Liked
      </span>
    </a>
  );
};

export default LikedBy;
