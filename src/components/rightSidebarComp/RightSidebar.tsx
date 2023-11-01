import { useNavigate } from "react-router-dom";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow";
import SocialAuthButtons from "@components/auth/SocialAuthButtons";
import Search from "./Search";
import { trends } from "@utils/consts";

interface IProps {
  isAuthenticated: boolean;
}

const RightSidebar = ({ isAuthenticated }: IProps) => {
  const navigate = useNavigate();

  return (
    <aside className="max-w-350px min-w-290px mr-10px hidden md:inline-block right-sidebar">
      <div className="flex flex-col relative h-full min-h-510px">
        {isAuthenticated ? (
          <div className="flex flex-col">
            <div className="xl:w-350px md:w-290px">
              {/* Search section */}
              <Search />

              {/* <Trends section after search input /> */}
              <div className="mt-20 bg-[color:var(--background-secondary)] rounded-2xl overflow-hidden">
                <div className="p-3">
                  <span className="text-xl font-bold">Trends For you</span>
                </div>
                <div className=" flex flex-col">
                  {trends.map((trend) => (
                    <Trends
                      key={trend.title}
                      title={trend.title}
                      tweetCount={trend.tweetCount}
                    />
                  ))}
                </div>
                <button className="text-left w-full hover:bg-[color:var(--background-third)] px-3 py-4 duration-100 cursor-not-allowed">
                  <span className="font-semibold text-[color:var(--color-primary)]">
                    Show More
                  </span>
                </button>
              </div>
              {/* account suggestion */}
              <WhoToFollow />
            </div>
          </div>
        ) : (
          <div className="flex flex-col pt-3">
            <div className="fixed xl:w-350px md:w-290px">
              <div className="mb-4 rounded-2xl border-2 border-[color:var(--background-third)] overflow-hidden">
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
