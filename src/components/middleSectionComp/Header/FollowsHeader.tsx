import { useNavigate, useParams } from "react-router-dom";
interface IProps {
  followsTab: "followers" | "following";
}

const FollowsHeader = ({ followsTab }: IProps) => {
  const username = useParams().username;
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-30">
      <div className="h-auto bg-[color:var(--background-primary-alpha)] backdrop-blur-md">
        <div className="flex w-full h-14">
          <div className="w-full h-full flex col-span-2">
            <button
              onClick={() => {
                navigate(`/${username}/followers`);
              }}
              className="flex justify-center w-full cursor-pointer hover:bg-[color:var(--background-third)] duration-150"
            >
              <div className="relative h-14 flex items-center w-fit">
                <h1 className={` ${followsTab === "followers" && "font-bold"}`}>
                  Followers
                </h1>
                {followsTab === "followers" && (
                  <div className="h-1 bg-[color:var(--color-primary)] absolute bottom-0 w-full rounded-full"></div>
                )}
              </div>
            </button>
            <button
              onClick={() => {
                navigate(`/${username}/following`);
              }}
              className="flex justify-center w-full cursor-pointer hover:bg-[color:var(--background-third)] duration-150"
            >
              <div className="relative h-14 flex items-center w-fit">
                <h1 className={` ${followsTab === "following" && "font-bold"}`}>
                  Following
                </h1>
                {followsTab === "following" && (
                  <div className="h-1 bg-[color:var(--color-primary)] absolute bottom-0 w-full rounded-full"></div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowsHeader;
