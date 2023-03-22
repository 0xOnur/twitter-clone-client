import React, { useState } from 'react'
import Header from './Header'
import Tweet from './Tweet'

const MiddleSection: React.FC = () => {

  const [isForYou, setIsForYou] = useState(false)

  return (
    <div className='container max-w-2xl border-x min-w-screen-sm'>
      <Header isForYou={isForYou} setIsForYou={setIsForYou} />
      <Tweet />
    </div>
  )
}
export default React.memo(MiddleSection)