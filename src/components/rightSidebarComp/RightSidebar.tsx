import React from 'react'
import Trends from './Trends'
import WhoToFollow from './WhoToFollow'
import { SearchIcon } from "@icons/Icon";


const RightSidebar = () => {

  type Trend = {
    title: string;
    tweetCount: number;
  };

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
  }

  const whoToFollows: Account[] = [
    {
      name: "Account 1",
      username: "@account1",
      avatar: "https://pbs.twimg.com/profile_images/1552608564371460098/cfJ8z7zb_400x400.jpg"
    },
    {
      name: "Account 2",
      username: "@account2",
      avatar: "https://pbs.twimg.com/profile_images/1525224493127544832/MWJSwspp_400x400.jpg"
    },
    {
      name: "Account 3",
      username: "@account3",
      avatar: "https://pbs.twimg.com/profile_images/1634576243747069956/3E3yRyhL_400x400.jpg"
    },
  ]

  return (
    <aside className="h-screen sticky top-0 justify-between w-4/6 hidden lg:inline-block">
      <div className=" flex items-center space-x-4 p-3 m-3 bg-gray-rightbar rounded-full text-gray-600 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary-base ">
        <SearchIcon className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="placeholder-black bg-transparent focus:outline-none w-full text-sm"
        />
      </div>
      <div className="mt-5 bg-gray-rightbar rounded-2xl m-3">
         {/* <Trends section after search input /> */}
         <div className='p-3'>
          <span className='text-xl font-bold'>Trends For you</span>
         </div>
         <div className=" flex flex-col">
          {trendData.map((trend) => (
            <Trends key={trend.title} title={trend.title} tweetCount={trend.tweetCount} />
          ))}
        </div>
        <a href="/" className='flex flex-col hover:bg-gray-trendsHover rounded-b-2xl px-3 py-4 duration-100'>
          <span className='text-primary-base'>Show More</span>
        </a>
        {/* account suggestion */}
      </div>
        <div className="mt-5 bg-gray-rightbar rounded-2xl m-3">
          <div className='p-3'>
            <span className='text-xl font-bold'>Who to follow</span>
          </div>
          <div className=" flex flex-col">
            {whoToFollows.map((account) => (
              <WhoToFollow key={account.username} name={account.name} username={account.username} avatar={account.avatar} />
            ))}
          </div>
          <a href="/" className='flex flex-col hover:bg-gray-trendsHover rounded-b-2xl px-3 py-4 duration-100'>
            <span className='text-primary-base'>Show More</span>
          </a>
        </div>
    </aside>
  )
}

export default React.memo(RightSidebar);