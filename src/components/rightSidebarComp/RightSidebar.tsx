import { useNavigate } from "react-router-dom";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow";
import SocialAuthButtons from "@components/auth/SocialAuthButtons";
import Search from "./Search";

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

  return (
    <aside className="max-w-350px min-w-290px mr-10px hidden md:inline-block right-sidebar overflow-y-auto">
      <div className="flex flex-col relative h-full min-h-510px">
        {isAuthenticated ? (
          <div className="flex flex-col">
            <div className="xl:w-350px md:w-290px">
              {/* Search section */}
              <Search />

              {/* <Trends section after search input /> */}
              <div className="mt-20 bg-gray-rightbar rounded-2xl">
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
              <WhoToFollow />
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
