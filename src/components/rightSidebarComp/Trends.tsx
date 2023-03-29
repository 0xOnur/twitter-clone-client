import React from 'react'

interface Props {
    title: string,
    tweetCount: number
}


const Trends: React.FC<Props> = (props) => {
  return (
      <div>
        <a href={`/search/${props.title}`}>
            <div className='hover:bg-gray-trendsHover cursor-pointer p-3 h-20 duration-100'>
                <span className='block  text-sm'>
                    Trending in Global
                </span>
                <span className='block text-md font-bold'>
                    {props.title}
                </span>
                <span className='block text-sm'>
                    {props.tweetCount} Tweets
                </span>
            </div>
        </a>
      </div>
  )
}

export default React.memo(Trends)