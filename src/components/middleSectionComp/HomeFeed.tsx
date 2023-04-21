import React, { useState } from 'react'
import { HeaderComp } from '@components/middleSectionComp'
import Tweet from './TweetFeed'
import { TweetComposer } from './ComposerComp'


const HomeFeed: React.FC = () => {

  const [isForYou, setIsForYou] = useState(false)

  return (
    <div className='container max-w-2xl border-x min-w-min'>
      <HeaderComp.Header pageType='home' isForYou={isForYou} setIsForYou={setIsForYou} />
      {/* There is after header section for create twitter and something */}
      <TweetComposer
        composerMode='tweet'
      />
      <Tweet />
    </div>
  )
}
export default React.memo(HomeFeed)