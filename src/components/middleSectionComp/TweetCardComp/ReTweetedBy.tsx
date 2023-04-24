import React from 'react'
import { ReTweetIcon } from '@icons/Icon'
import {IUser} from "@customTypes/UserTypes"

interface IProps {
  reTweeterUser: IUser,
}

const ReTweetedBy = ({reTweeterUser}:IProps) => {
  return (
    <div>
        <div className="flex flex-row relative items-center -mt-1 mb-1">
        <div className="basis-12 mr-3">
            <span className="float-right">
            <ReTweetIcon className={"w-4 h-4"} />
            </span>
        </div>
        <span className="font-semibold text-gray-600 leading-5">
            {reTweeterUser.displayName} Retweeted
        </span>
        </div>
    </div>
  )
}

export default ReTweetedBy