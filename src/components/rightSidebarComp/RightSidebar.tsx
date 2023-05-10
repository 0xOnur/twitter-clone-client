import { useNavigate } from "react-router-dom";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow";
import { SearchIcon } from "@icons/Icon";
import SocialAuthButtons from "@components/auth/SocialAuthButtons";

interface IProps {
  isAuthenticated: boolean;
}

type Trend = {
  title: string;
  tweetCount: number;
};

const RightSidebar = ({ isAuthenticated }: IProps) => {
  const navigate = useNavigate();

  const trendData: Trend[] = [
    {
      title: "Trend 1",
      tweetCount: 1000,
    },
    {
      title: "Trend 2",
      tweetCount: 1000,
    },
    {
      title: "Trend 3",
      tweetCount: 1000,
    },
    {
      title: "Trend 4",
      tweetCount: 1000,
    },
    {
      title: "Trend 5",
      tweetCount: 1000,
    },
    {
      title: "Trend 6",
      tweetCount: 1000,
    },
    {
      title: "Trend 7",
      tweetCount: 1000,
    },
    {
      title: "Trend 8",
      tweetCount: 1000,
    },
    {
      title: "Trend 9",
      tweetCount: 1000,
    },
    {
      title: "Trend 10",
      tweetCount: 1000,
    },
  ];

  type Account = {
    name: string;
    username: string;
    avatar: string;
  };

  const whoToFollows: Account[] = [
    {
      name: "Account 1",
      username: "@account1",
      avatar:
        "https://pbs.twimg.com/profile_images/1552608564371460098/cfJ8z7zb_400x400.jpg",
    },
    {
      name: "Account 2",
      username: "@account2",
      avatar:
        "https://pbs.twimg.com/profile_images/1525224493127544832/MWJSwspp_400x400.jpg",
    },
    {
      name: "Account 3",
      username: "@account3",
      avatar:
        "https://pbs.twimg.com/profile_images/1634576243747069956/3E3yRyhL_400x400.jpg",
    },
  ];

  return (
    <aside className="max-w-350px min-w-290px mr-10px hidden md:inline-block right-sidebar overflow-y-auto">
      <div className="flex flex-col relative h-full min-h-510px">
        {isAuthenticated ? (
          <div className="flex flex-col">
            {/* Search section */}
            <div className="xl:w-350px md:w-290px">
              <div className="fixed xl:w-350px md:w-290px z-10">
                <div className="py-0.5 bg-white">
                  <div className="flex items-center space-x-4 p-3 m-3 bg-gray-rightbar rounded-full text-gray-600 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary-base">
                    <SearchIcon className="w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search Twitter"
                      className="placeholder-black bg-transparent focus:outline-none w-full text-sm"
                    />
                  </div>
                </div>
                
              </div>

              {/* <Trends section after search input /> */}
              <div className="mt-20 bg-gray-rightbar rounded-2xl m-3">
                <div className="p-3">
                  <span className="text-xl font-bold">Trends For you</span>
                </div>
                <div className=" flex flex-col">
                  {trendData.map((trend) => (
                    <Trends
                      key={trend.title}
                      title={trend.title}
                      tweetCount={trend.tweetCount}
                    />
                  ))}
                </div>
                <a
                  href="/"
                  className="flex flex-col hover:bg-gray-trendsHover rounded-b-2xl px-3 py-4 duration-100"
                >
                  <span className="text-primary-base">Show More</span>
                </a>
              </div>
              {/* account suggestion */}
              <div className="mt-5 bg-gray-rightbar rounded-2xl m-3">
                <div className="p-3">
                  <span className="text-xl font-bold">Who to follow</span>
                </div>
                <div className=" flex flex-col">
                  {whoToFollows.map((account) => (
                    <WhoToFollow
                      key={account.username}
                      name={account.name}
                      username={account.username}
                      avatar={account.avatar}
                    />
                  ))}
                </div>
                <a
                  href="/"
                  className="flex flex-col hover:bg-gray-trendsHover rounded-b-2xl px-3 py-4 duration-100"
                >
                  <span className="text-primary-base">Show More</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col pt-3">
            <div className="fixed xl:w-350px md:w-290px">
              <div className="mb-4 border rounded-2xl overflow-hidden">
                <section>
                  <div className="py-3 px-4">
                    <span className="font-bold leading-6 text-xl">
                      New to Twitter?
                    </span>
                  </div>
                  <div className="px-3">
                    <span className="text-xs">
                      Sign up now to get your own personalized timeline!
                    </span>
                  </div>
                  <div className="my-4 px-3">
                    <SocialAuthButtons mode="signup" />
                    <div className="h-10 my-3">
                      <button
                        onClick={() => navigate("/signup")}
                        className="w-full h-full border rounded-full bg-white hover:bg-gray-200 text-black"
                      >
                        <div className="flex flex-row justify-center items-center">
                          <span className="font-bold">Create account</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
