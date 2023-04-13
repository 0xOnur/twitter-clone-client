import React, { useState } from 'react'
import Header from './Header'
import {TweetComposer} from './ComposerComp/'
import Tweet from './Tweet'


const MiddleSection: React.FC = () => {

  const [isForYou, setIsForYou] = useState(false)

  return (
    <div className='container max-w-2xl border-x min-w-screen-sm'>
      <Header isForYou={isForYou} setIsForYou={setIsForYou} />
      {/* There is after header section for create twitter and something */}
      <TweetComposer />
      <Tweet />
    </div>
  )
}
export default React.memo(MiddleSection)