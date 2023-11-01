interface IProps {
    title: string,
    tweetCount: number
}

const Trends = ({title, tweetCount}: IProps) => {
  return (
      <div>
        <button className="w-full text-left cursor-not-allowed">
            <div className='p-3 h-20 hover:bg-[color:var(--background-third)] duration-100'>
                <span className="block text-[13px] leading-4 text-[color:var(--color-base-secondary)]">
                    Trending in Global
                </span>
                <span className="my-0.5 block font-bold leading-5">
                    {title}
                </span>
                <span className="block leading-4 text-[13px] text-[color:var(--color-base-secondary)]">
                    {tweetCount} Tweets
                </span>
            </div>
        </button>
      </div>
  )
}

export default Trends