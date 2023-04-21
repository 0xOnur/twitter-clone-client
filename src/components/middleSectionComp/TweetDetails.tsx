import React from 'react'
import { HeaderComp } from '@components/middleSectionComp'
import { TweetCard } from './TweetCardComp'
import {TweetProps} from "@customTypes/TweetTypes"
import Comments from './TweetDetailsComp/Comments'

const TweetDetails = () => {

    const tweet:TweetProps = {
        "_id": "60a3d5a3a942a21a487e7f26",
        "author": {
          "id": "60a2c1b2a942a21a487e7f2",
          "name": "John Doe",
          "username": "uniquser",
          "avatar": "https://pbs.twimg.com/profile_images/1504849693452427265/08B4ILCz_400x400.jpg"
        },
        "content": "Im new here :)",
        "media": [
          
          {
            "url": "https://image.lexica.art/full_jpg/a7b048f4-e1f9-43f4-8f40-f6f91bb9ee97",
            "alt": "Portrait of a queen with long marsala color braided hair",
            "type": "image"
          },
          {
            "url": "https://image.lexica.art/full_jpg/21013189-6dee-4921-9578-6319626f4793",
            "alt": "Jennifer lawrence, black metal girl makeup, realistic detailed",
            "type": "image"
          },
          {
            "url": "https://image.lexica.art/full_jpg/8de701f4-d4b0-4948-929f-39b5f6c62688",
            "alt": "Mason jar overflowing with coins with transparent background",
            "type": "image"
          }
        ],
        "comments": [
          {
            "_id": "60a3d5a3a942a21a487e7f26",
            "userId": "60a2c1b2a942a21a487e7f21",
            "username": "commenting_user",
            "comment": "",
            "createdAt": new Date("2023-04-11T10:55:00.000Z")
          }
        ],
        "retweets": [
          {
            "_id": "60a3d5a3a942a21a487e7f27",
            "userId": "60a2c1b2a942a21a487e7f22",
            "username": "retweeting_user",
            "avatar": "https://example.com/avatar.jpg",
            "bio": "Hi, I am the retweeting user.",
          }
        ],
        "quoteTweets": [
          {
            "_id": "60a3d5a3a942a21a487e7f28",
          }
        ],
        "likes": [
          {
            "_id": "60a3d5a3a942a21a487e7f28",
            "userId": "60a2c1b2a942a21a487e7f23",
            "username": "liking_user",
            "avatar": "https://example.com/avatar.jpg",
            "bio": "Hi, I am the liking user.",
          }
        ],
        "bookmarks": [
          {
            "_id": "60a3d5a3a942a21a487e7f29",
          }
        ],
        "view": 37800,
        "createdAt": new Date("2023-04-21T03:15:00.000Z")
      }

  return (
    <div className='container max-w-screen-sm border-x min-w-screen-sm'>
        <HeaderComp.Header pageType='tweet'/>
        <TweetCard tweet={tweet} pageType='tweetDetails' /> 
        <Comments />
    </div>
  )
}

export default TweetDetails