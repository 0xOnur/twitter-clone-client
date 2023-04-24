import React from 'react'

type Props = {
    avatar: string;
    username: string;
}

const Avatar = ({avatar, username}:Props) => {
  return (
    <div className="mr-3 items-center min-w-max">
        <a href={`/${username}`}>
            <img
            src={avatar}
            alt="profile"
            className="rounded-full w-12 h-12 hover:brightness-90"
            />
        </a>
    </div>
  )
}

export default Avatar