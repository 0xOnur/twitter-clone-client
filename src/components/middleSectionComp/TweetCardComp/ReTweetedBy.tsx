import React from 'react'
import { ReTweetIcon } from '@icons/Icon'

const ReTweetedBy = () => {
  return (
    <div>
        <div className="flex flex-row relative items-center -mt-1 mb-1">
        <div className="basis-12 mr-3">
            <span className="float-right">
            <ReTweetIcon className={"w-4 h-4"} />
            </span>
        </div>
        <span className="font-semibold text-gray-600 leading-5">
            Ahbap Retweeteed
        </span>
        </div>
    </div>
  )
}

export default ReTweetedBy