import React, {useState, useRef, useCallback, ChangeEvent} from 'react'
import { DropDownMenuArrowIcon,
  ImageIcon,
  GIFIcon,
  PollIcon,
  EmojiIcon,
  ScheduleIcon,
  AddThreadIcon,
 } from '../../icons/Icon'
import useAutosizeTextArea from './useAutosizeTextArea'
import CircleProgressBar from './CircleProgressBar'
import AudienceMenu from './AudienceMenu'
import { EveryoneIcon } from '../../icons/Icon'

const TweetComposer = () => {

  const [isWritingTweet, setWiritinTweet] = useState(false)
  const [tweet, setTweet] = useState("")

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef, tweet)

  const handleChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = evt.target?.value;
    setTweet(value)
  }, []) 

  const handleFileUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log(selectedFile)
    }
  }, []);

  return (
    <div>
      <div className='py-1  '>
        <div className='px-4 border-b'>
          <div className='flex  flex-row w-full h-fit'>
            
            <div className='w-14 h-14 mr-2 pt-1'>
              <a  href="/profile">
                  <img src="https://pbs.twimg.com/profile_images/1545489373143224321/M6KIvOIY_400x400.jpg" alt="profile"
                    className='rounded-full w-12 h-12 hover:brightness-90' 
                  />
              </a>
            </div>
            
            <div className='flex flex-col w-full pt-1'>
              <form className='flex flex-col'>
                {isWritingTweet && (
                  <div className='relative inline-flex pb-3'>
                    <button className='text-primary-base hover:bg-primary-extraLight border rounded-full inline-flex items-center px-3'>
                      <span className='text-sm font-medium'>Everyone</span>
                      <span className=''><DropDownMenuArrowIcon /></span>
                    </button>
                    <div className='absolute w-fit h-fit bg-white border rounded-2xl top-8 z-20'>
                      <AudienceMenu />
                    </div>
                  </div>
                  )
                }
                <div className='relative flex-grow'>
                  <div className='py-3'>
                    {/* create textarea for tweet */}
                    <textarea className="focus:outline-none resize-none text-xl block w-full" 
                      placeholder="What's happening?" onClick={()=> {setWiritinTweet(true)}}
                      ref={textAreaRef}
                      value={tweet}
                      onChange={handleChange}
                      maxLength={280}
                    />
                  </div>
                </div>
                {isWritingTweet && (
                  <div className='inline-flex border-b'>
                    <div className='pb-3'>
                      <button className='text-primary-base hover:bg-primary-extraLight border border-white rounded-full inline-flex items-center px-3'>
                        <span className='mr-1'><EveryoneIcon className={"w-4 h-4"} /></span>
                        <span className='text-sm font-bold py-1'>Everyone can reply</span>
                      </button>
                    </div>
                    
                  </div>
                )}
                <div className='flex'>
                  <div className='flex z-10 justify-between w-full my-3'>
                    <div className='w-full flex'>
                      <div className='p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer'>
                        <label htmlFor="file-input" className='cursor-pointer w-8 h-8'>
                          <ImageIcon className={"w-5 h-5 text-primary-base fill-current font-bold"} />
                        </label>
                        <input className='hidden' id="file-input" type="file" onChange={handleFileUpload} />
                      </div>

                      <div className='p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer'>
                        <label className='cursor-pointer w-8 h-8'>
                          <GIFIcon className={"w-5 h-5 text-primary-base fill-current font-bold"} />
                        </label>
                      </div>
                      
                      <div className='p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer'>
                        <label className='cursor-pointer w-8 h-8'>
                          <PollIcon className={"w-5 h-5 text-primary-base fill-current font-bold"} />
                        </label>
                      </div>
                      
                      <div className='p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer'>
                        <label className='cursor-pointer w-8 h-8'>
                          <EmojiIcon className={"w-5 h-5 text-primary-base fill-current"} />
                        </label>
                      </div>
                      
                      <div className='p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer'>
                        <label className='cursor-pointer w-8 h-8'>
                          <ScheduleIcon className={"w-5 h-5 text-primary-base fill-current"} />
                        </label>
                      </div>

                    </div>
                    <div className='w-full h-full text-right'>
                      <div className='flex h-full justify-end items-center'>
                        {tweet.length > 0 && (
                          <>
                            <CircleProgressBar value={tweet.length} limit={280} />
                            <div className='w-0.5 mx-3 h-full bg-gray-300'></div>

                            <div className='text-primary-base hover:bg-primary-extraLight border rounded-full p-1 cursor-pointer'>
                              <AddThreadIcon className={"w-4 h-4"} />
                            </div>
                            </>
                          )
                        }
                        <button className='border h-full px-3 ml-3 rounded-full bg-primary-base hover:bg-primary-dark text-white font-bold'>
                          Tweet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default React.memo(TweetComposer)