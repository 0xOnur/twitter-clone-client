import { LocationIcon, BirthIcon, WebsiteIcon, CalendarIcon } from "@icons/Icon";
import { formatDate, getMonthNameFromNumber } from "utils";

interface IProps {
  user: IUser;
}

const UserInfo = ({ user }: IProps) => {
  return (
    <div className="flex flex-col pb-3 px-4 min-w-max">
      <div className="mb-3">
        <span className="whitespace-pre-line">{user.bio}</span>
      </div>
      <div className="flex flex-row items-center justify-start gap-5 mb-3">
        {user.location && (
          <div className="flex flex-row items-center gap-1">
            <LocationIcon className="w-5 h-5" />
            <span>{user.location}</span>
          </div>
        )}
        {user.birthDay && (
          <div className="flex flex-row items-center gap-1">
            <BirthIcon className="w-5 h-5" />
            <div className="flex gap-1">
              <span>Born</span>
              <span>{getMonthNameFromNumber(user.birthDay?.month!)}</span>
              <span>{user.birthDay?.day}</span>
            </div>
          </div>
        )}

        <div className="flex flex-row items-center gap-1">
          <CalendarIcon className="w-5 h-5" />
          <div className="flex gap-1">
            <span>Joined</span>
            <span>{formatDate(user.createdAt!)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <a href={`/${user.username}/following`} className="flex flex-row gap-1 cursor-pointer hover:underline underline-offset-auto">
          <span className="font-bold">{user.following.length}</span>
          <span>Following</span>
        </a>
        <a href={`/${user.username}/followers`} className="flex flex-row gap-1 cursor-pointer hover:underline underline-offset-auto">
          <span className="font-bold">{user.followers.length}</span>
          <span>Followers</span>
        </a>
      </div>
      {/* website info */}
      {user.website && (
        <div className="flex flex-row items-center gap-1 mt-3">
          <WebsiteIcon className="w-5 h-5" />
          <a
            href={user.website}
            target="_blank"
            rel="noreferrer"
            className="text-primary-base hover:underline"
          >
            {user.website}
          </a>
          </div>
      )}

    </div>
  );
};

export default UserInfo;
