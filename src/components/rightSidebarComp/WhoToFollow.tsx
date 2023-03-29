import React from 'react'

interface Props {
    name: string
    username: string
    avatar: string
}

const WhoToFollow: React.FC<Props> = (props) => {
  return (
        <div>
            <div className='flex items-center justify-between p-3 hover:bg-gray-trendsHover cursor-pointer duration-150'>
                <div className='flex items-center'>
                    <img src={props.avatar} alt="avatar" className='w-10 h-10 rounded-full' />
                    <div className='flex flex-col ml-3'>
                        <span className='text-md font-bold'>{props.name}</span>
                        <span className='text-sm'>{props.username}</span>
                    </div>
                </div>
                <div className='flex bg-black py-2 px-5 text-white rounded-2xl'>
                    <span className='text-sm'>Follow</span>
                </div>
            </div>
        </div>
        
  )
}

export default WhoToFollow